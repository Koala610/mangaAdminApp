export interface Message {
    id: number,
    support_id: number,
    user_id: number,
    message: string,
    last_updated: string,
    is_processed: boolean,
    response: string
}

export interface Support {
    id: number,
    user_id: number,
}