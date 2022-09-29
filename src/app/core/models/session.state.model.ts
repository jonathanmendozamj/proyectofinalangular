import { User } from "./user.model";

export interface SessionState {
    isActive: boolean;
    user?: User;
};