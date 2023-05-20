export interface AuthData {
    access_token: string;
    refresh_token: string;
}

export interface Admin {
    id: number | null,
    user_id: string | null,
    username: string
}