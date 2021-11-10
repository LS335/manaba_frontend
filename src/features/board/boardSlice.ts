import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import {
    READ_BOARD,
    POST_BOARD,
    CATEGORY,
    COMMENT,
    BOARD_STATE,
    USER
} from '../types';

export const fetchAsyncGetBoards = createAsyncThunk(
    'board/getBoard',
    async () => {
        const res = await axios.get<READ_BOARD[]>(
            `${process.env.REACT_APP_API_URL}/api/boards/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            },
        );
        return res.data;
    }
);

export const fetchAsyncGetUsers = createAsyncThunk(
    'board/getUsers',
    async () => {
        const res = await axios.get<USER[]>(
            `${process.env.REACT_APP_API_URL}/api/users/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            },
        );
        return res.data;
    }
);

export const fetchAsyncGetCategory = createAsyncThunk(
    'board/getCategory',
    async () => {
        const res = await axios.get<CATEGORY[]>(
            `${process.env.REACT_APP_API_URL}/api/category/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            },
        );
        return res.data;
    }
);

export const fetchAsyncGetComments = createAsyncThunk(
    'board/getComment',
    async () => {
        const res = await axios.get<COMMENT[]>(
            `${process.env.REACT_APP_API_URL}/api/comment/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            },
        );
        return res.data;
    }
);

export const fetchAsyncCreateCategory = createAsyncThunk(
    'board/createCategory',
    async (item: string) => {
        const res = await axios.post<CATEGORY>(
            `${process.env.REACT_APP_API_URL}/api/category/`,
            { item: item },
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateComment = createAsyncThunk(
    'board/createComment',
    async (comment: string) => {
        const res = await axios.post<COMMENT>(
            `${process.env.REACT_APP_API_URL}/api/comment/`,
            { comment: comment },
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateBoard = createAsyncThunk(
    'board/createBoard',
    async (board: POST_BOARD) => {
        const res = await axios.post<READ_BOARD>(
            `${process.env.REACT_APP_API_URL}/api/boards/`,
            board,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            },
        );
        return res.data;
    }
);

export const fetchAsyncUpdateBoard = createAsyncThunk(
    'board/updateBoard',
    async (board: POST_BOARD) => {
        const res = await axios.put<READ_BOARD>(
            `${process.env.REACT_APP_API_URL}/api/boards/${board.id}/`,
            board,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            },
        );
        return res.data;
    }
);

export const fetchAsyncDeleteBoard = createAsyncThunk(
    'board/deleteBoard',
    async (id: number) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/boards/${id}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            },
        );
        return id;
    },
);


export const initialState: BOARD_STATE = {
    boards: [
        {
            id: 0,
            title: '',
            board: '',
            category: 0,
            category_item: '',
            comment: 0,
            comment_comment: '',
            owner: 0,
            owner_username: '',
            created_at: '',
            updated_at: '',
        },
    ],
    editedBoard: {
        id: 0,
        title: '',
        board: '',
        category: 0
    },
    selectedBoard: {
        id: 0,
        title: '',
        board: '',
        category: 0,
        category_item: '',
        comment: 0,
        comment_comment: '',
        owner: 0,
        owner_username: '',
        created_at: '',
        updated_at: '',
    },
    users: [
        {
            id: 0,
            username: '',
        },
    ],
    category: [
        {
            id: 0,
            item: '',
        },
    ],
    comment: [
        {
            id: 0,
            comment: '',
        }
    ]
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        editBoard(state, action: PayloadAction<POST_BOARD>) {
            state.editedBoard = action.payload;
        },
        selectBoard(state, action: PayloadAction<READ_BOARD>) {
            state.selectedBoard = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetBoards.fulfilled,
            (state, action: PayloadAction<READ_BOARD[]>) => {
                return {
                    ...state,
                    boards: action.payload,
                };
            },
        );
        builder.addCase(
            fetchAsyncGetBoards.rejected,
            () => {
                window.location.href = "/";
            },
        );
        builder.addCase(
            fetchAsyncGetUsers.fulfilled,
            (state, action: PayloadAction<USER[]>) => {
                return {
                    ...state,
                    users: action.payload,
                };
            },
        );
        builder.addCase(
            fetchAsyncGetCategory.fulfilled,
            (state, action: PayloadAction<CATEGORY[]>) => {
                return {
                    ...state,
                    category: action.payload,
                };
            }
        );
        builder.addCase(
            fetchAsyncGetComments.fulfilled,
            (state, action: PayloadAction<COMMENT[]>) => {
                return {
                    ...state,
                    comment: action.payload,
                };
            }
        );
        builder.addCase(
            fetchAsyncCreateCategory.fulfilled,
            (state, action: PayloadAction<CATEGORY>) => {
                return {
                    ...state,
                    category: [...state.category, action.payload],
                };
            },
        );
        builder.addCase(
            fetchAsyncCreateCategory.rejected,
            () => {
                window.location.href = "/";
            },
        );
        builder.addCase(
            fetchAsyncCreateComment.fulfilled,
            (state, action: PayloadAction<COMMENT>) => {
                return {
                    ...state,
                    comment: [...state.comment, action.payload],
                };
            },
        );
        builder.addCase(
            fetchAsyncCreateComment.rejected,
            () => {
                window.location.href = "/";
            },
        );
        builder.addCase(
            fetchAsyncCreateBoard.fulfilled,
            (state, action: PayloadAction<READ_BOARD>) => {
                return {
                    ...state,
                    boards: [action.payload, ...state.boards],
                    editedBoard: initialState.editedBoard,
                };
            }
        );
        builder.addCase(
            fetchAsyncCreateBoard.rejected,
            () => {
                window.location.href = "/";
            },
        );
        builder.addCase(
            fetchAsyncUpdateBoard.fulfilled,
            (state, action: PayloadAction<READ_BOARD>) => {
                return {
                    ...state,
                    boards: state.boards.map((b) => 
                        b.id === action.payload.id ? action.payload : b
                    ),
                    editedBoard: initialState.editedBoard,
                    selectedBoard: initialState.selectedBoard
                };
            },
        );
        builder.addCase(
            fetchAsyncUpdateBoard.rejected,
            () => {
                window.location.href = "/";
            },
        );
        builder.addCase(
            fetchAsyncDeleteBoard.fulfilled,
            (state, action: PayloadAction<number>) => {
                return {
                    ...state,
                    boards: state.boards.filter((b) => b.id !== action.payload),
                    editedBoard: initialState.editedBoard,
                    selectedBoard: initialState.selectedBoard,
                };
            },
        );
        builder.addCase(
            fetchAsyncDeleteBoard.rejected,
            () => {
                window.location.href = "/";
            },
        );
    },
});

export const { editBoard, selectBoard } = boardSlice.actions;

export const selectSelectedBoard = (state: RootState) => state.board.selectedBoard;
export const selectEditBoard = (state: RootState) => state.board.editedBoard;
export const selectBoards = (state: RootState) => state.board.boards;
export const selectUsers = (state: RootState) => state.board.users;
export const selectCategory = (state: RootState) => state.board.category;
export const selectComment = (state: RootState) => state.board.comment;

export default boardSlice.reducer;