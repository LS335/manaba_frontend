import React from 'react'
import { useSelector } from 'react-redux';
import { selectSelectedBoard } from './boardSlice';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';

const BoardDisplay: React.FC = () => {
    const selectedBoard = useSelector(selectSelectedBoard);
    const rows = [
        { item: "Title", data: selectedBoard.title  },
        { item: "Board", data: selectedBoard.board },
        { item: "Category", data: selectedBoard.category_item },
        { item: "Created", data: selectedBoard.created_at },
        { item: "Updated", data: selectedBoard.updated_at },
    ];

    if (!selectedBoard.board) {
        return null;
    };

    return (
        <>
            <h2>詳細</h2>
            <Table>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.item}>
                            <TableCell align="center">
                                <strong>{row.item}</strong>
                            </TableCell>
                            <TableCell align="center">{row.data}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default BoardDisplay;
