import React, { useState } from 'react'
import styles from './Auth.module.css';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, TextField } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchAsyncCreateProf,
    selectIsLoginView    
} from './authSlice';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(3)
    }
}));

const Auth: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const isLoginView = useSelector(selectIsLoginView);

    const [credential, setCredential] = useState({ username: "", password: "" });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const login = async () => {
        if(isLoginView) {
            await dispatch(fetchAsyncLogin(credential));
        } else {
            const result = await dispatch(fetchAsyncRegister(credential));
            if (fetchAsyncRegister.fulfilled.match(result)) {
                await dispatch(fetchAsyncLogin(credential));
                await dispatch(fetchAsyncCreateProf());
            }
        }
    }



    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            ManaBan
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={styles.auth__root}>
                <h1>{isLoginView ? "ログイン" : "新規登録"}</h1>
                <TextField 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="ユーザー名"
                    type="text"
                    name="username"
                    value={credential.username}
                    onChange={handleInputChange}
                />
                <TextField 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="パスワード"
                    type="password"
                    name="password"
                    value={credential.password}
                    onChange={handleInputChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    onClick={login}
                >
                    {isLoginView ? "ログイン" : "新規登録"}
                </Button>
                <span onClick={() => dispatch(toggleMode())}>
                    {isLoginView ? "新規アカウント作成" : "ログインページに戻る"}
                </span>
                </div>
        </div>
    )
}

export default Auth;
