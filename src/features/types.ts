/*authSlice.ts*/
export interface LOGIN_USER {
    id: number;
    username: string;
}
export interface FILE extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
export interface PROFILE {
    id: number;
    user_profile: number;
    img: string | null;
}
export interface POST_PROFILE {
    id: number;
    img: File | null;
}
export interface CRED {
    username: string;
    password: string;
}
export interface JWT {
    refresh: string;
    access: string;
}
export interface USER {
    id: number;
    username: string;
}
export interface AUTH_STATE {
    isLoginView: boolean;
    loginUser: LOGIN_USER;
    profiles: PROFILE[];
}
/*boardSlice.ts*/
export interface READ_BOARD {
    id: number;
    title: string;
    board: string;
    category: number;
    category_item: string;
    comment: number;
    comment_comment: string;
    owner: number;
    owner_username: string;
    created_at: string;
    updated_at: string;
}
export interface POST_BOARD {
    id: number;
    title: string;
    board: string;
    category: number;
}
export interface CATEGORY {
    id: number;
    item: string;
}
export interface COMMENT {
    id: number;
    comment: string;
}
export interface BOARD_STATE {
    boards: READ_BOARD[];
    editedBoard: POST_BOARD;
    selectedBoard: READ_BOARD;
    users: USER[];
    category: CATEGORY[];
    comment: COMMENT[];
}
/*BoardList.tsx*/
export interface SORT_STATE {
    rows: READ_BOARD[];
    order: "desc" | "asc";
    activeKey: string;
}