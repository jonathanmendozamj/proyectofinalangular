export interface User {
    id: string;
    user: string;
    name: string;
    address: string;
    phone: string;
    password: string;
    profile?: string;
    isAdmin?: boolean;
}