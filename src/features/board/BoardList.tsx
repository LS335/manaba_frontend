import React, { useState, useEffect } from 'react'

import styles from './BoardList.module.css';
import { makeStyles, Theme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
    Button,
    Avatar,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TableSortLabel,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
    fetchAsyncDeleteBoard,
    selectBoards,
    editBoard,
    selectBoard
} from './boardSlice';
import { selectLoginUser, selectProfiles } from '../auth/authSlice';
import { AppDispatch } from '../../app/store';
import { initialState } from './boardSlice';
import { SORT_STATE, READ_BOARD } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        tableLayout: "fixed",
    },
    button: {
        margin: theme.spacing(3),
    },
    small: {
        margin: "auto",
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const BoardList: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const boards = useSelector(selectBoards);
    const loginUser = useSelector(selectLoginUser);
    const profiles = useSelector(selectProfiles);
    const columns = boards[0] && Object.keys(boards[0]);

    const [state, setState] = useState<SORT_STATE>({
        rows: boards,
        order: "desc",
        activeKey: ""
    });

    const handleClickSortColumn = (column: keyof READ_BOARD) => {
        const isDesc = column === state.activeKey && state.order === "desc";
        const newOrder = isDesc ? "asc" : "desc";
        const sortedRows = Array.from(state.rows).sort((a, b) => {
            if (a[column] > b[column]) {
                return newOrder === "asc" ? 1 : -1;
            } else if (a[column] < b[column]) {
                return newOrder === "asc" ? -1 : 1;
            } else {
                return 0;
            }
        });

        setState({
            rows: sortedRows,
            order: newOrder,
            activeKey: column,
        });
    };

    useEffect(() => {
        setState((state) => ({
            ...state,
            rows: boards
        }));
    }, [boards]);

    const conditionalSrc = (user: number) => {
        const loginProfile = profiles.filter(
            (prof) => prof.user_profile === user
        )[0];
        return loginProfile?.img !== null ? loginProfile?.img : undefined;
    };

    return (
        <>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                    dispatch(
                        editBoard({
                            id: 0,
                            title: '',
                            board: '',
                            category: 1,
                        })
                    )
                    dispatch(selectBoard(initialState.selectedBoard));
                }}
            >
                追加
            </Button>
            {boards[0]?.board && (
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, colIndex) => 
                                (
                                    column === "title" ||
                                    column === "category" ||
                                    column === "owner" 
                                
                                ) && (
                                    <TableCell align="center" key={colIndex}>
                                        <TableSortLabel
                                            active={state.activeKey === column}
                                            direction={state.order}
                                            onClick={() => handleClickSortColumn(column)}
                                        >
                                            <strong>{column}</strong>
                                        </TableSortLabel>
                                    </TableCell>
                                )
                            )}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.rows.map((row, rowIndex) => (
                            <TableRow hover key={rowIndex}>
                                {Object.keys(row).map(
                                    (key, colIndex) => 
                                    (
                                        key === "title" ||
                                        key === "category_item"
                                    ) && (
                                        <TableCell
                                            align="center"
                                            className={styles.tasklist__hover}
                                            key={`${rowIndex}+${colIndex}`}
                                            onClick={() => {
                                                dispatch(selectBoard(row));
                                                dispatch(editBoard(initialState.editedBoard))
                                            }}
                                        >
                                            <span>{row[key]}</span>
                                        </TableCell>
                                    )
                                )}
                                <TableCell>
                                    <Avatar 
                                        className={classes.small}
                                        alt="owner"
                                        src={conditionalSrc(row["owner"])}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <button
                                        className={styles.tasklist__icon}
                                        onClick={() => {
                                            dispatch(fetchAsyncDeleteBoard(row.id))
                                        }}
                                        disabled={row["owner"] !== loginUser.id}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </button>
                                    <button
                                        className={styles.tasklist__icon}
                                        onClick={() => dispatch(editBoard(row))}
                                        disabled={row["owner"] !== loginUser.id}
                                    >
                                        <EditOutlinedIcon />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default BoardList;