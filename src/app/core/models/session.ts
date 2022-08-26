import { User } from "./user";

export interface Session {
    isActive: boolean,
    user?: User
}