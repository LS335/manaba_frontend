import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Avatar, Grid } from '@material-ui/core';
import { 
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";

import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectProfiles,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncUpdateProf,
} from './features/auth/authSlice';
import {
  fetchAsyncGetBoards,
  fetchAsyncGetUsers,
  fetchAsyncGetCategory,
  fetchAsyncGetComments,
  selectEditedBoard,
  selectBoards
} from './features/board/boardSlice';

import BoardList from './features/board/BoardList';
import BoardForm from './features/board/BoardForm';
import BoardDisplay from './features/board/BoardDisplay';
import { AppDispatch } from './app/store';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginLeft: theme.spacing(1),
  },
  icon: {
    marginTop: theme.spacing(3),
    cursor: "none",
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedBoard = useSelector(selectEditedBoard);
  const boards = useSelector(selectBoards);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);

  const loginProfile = profiles.filter(
    (prof) => prof.user_profile === loginUser.id
  )[0];

  const logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  }

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetBoards());
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(fetchAsyncGetUsers());
      await dispatch(fetchAsyncGetCategory());
      await dispatch(fetchAsyncGetComments());
      await dispatch(fetchAsyncGetProfs());
    }
    fetchBootLoader();
  },[dispatch]);

  return (
    <div className={styles.app__root}>
      <Grid container>
        <Grid item xs={4}>
          <PolymerIcon className={classes.icon} />
        </Grid>
        <Grid item xs={4}>
          <h1>ManaBan</h1>
        </Grid>
        <Grid item xs={4}>
          <div className={styles.app__logout}>
            <button className={styles.app__iconLogout} onClick={logout}>
              <ExitToAppIcon fontSize="large" />
            </button>
            <input 
              type="file"
              id="imageInput"
              hidden={true}
              onChange={(e) => {
                dispatch(
                  fetchAsyncUpdateProf({
                    id: loginProfile.id,
                    img: e.target.files !== null ? e.target.files[0] : null,
                  })
                )
              }}
            />
            <button className={styles.app__btn} onClick={handlerEditPicture}>
              <Avatar 
                className={classes.avatar}
                alt="avatar"
                src={
                  loginProfile?.img !== null ? loginProfile?.img : undefined
                }
              />
            </button>
          </div>
        </Grid>
        <Grid item xs={6}>
          {boards[0]?.board && <BoardList />}
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "80vh" }}
          >
            <Grid item>
              {editedBoard.title ? <BoardForm /> : <BoardDisplay />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
