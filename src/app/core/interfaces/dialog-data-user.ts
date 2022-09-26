import { User } from "../models/user.model";

export interface DialogDataUser {
    user: User,
    modify: boolean;
    title: string;
};