export interface User {
    id: number 
    bookmarks_per_page: number
    is_subscribed :boolean
    name: string
    bookmarks_hash: string
    last_updated: string
}