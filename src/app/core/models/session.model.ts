import { User } from "./user.model";

export interface Session {
    isActive: boolean,
    user?: User
}