export interface AuthData {
    access_token: string;
    refresh_token: string;
}

export interface Admin {
    user_id: string | null,
    username: string
}