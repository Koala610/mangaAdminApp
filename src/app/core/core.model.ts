export interface User {
    id: number 
    bookmarks_per_page: number
    is_subscribed :boolean
    is_support: boolean
    name: string
    bookmarks_hash: string
    last_updated: string
}