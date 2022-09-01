export interface User {
    id: string;
    user: string;
    password: string;
    profile?: string;
    isAdmin?: boolean;
}