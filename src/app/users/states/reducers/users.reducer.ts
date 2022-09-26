import { createReducer, on } from "@ngrx/store";
import { UserState } from "src/app/core/models/user.state";
import { loadedUsers, loadingUsers } from "../actions/users.action";

const initialState: UserState = {
    loading: false,
    users: []
}

export const USERS_FEATURED_KEY = 'users';

export const usersReducer = createReducer(
    initialState,
    on(loadingUsers, (state) => {
        return { 
            ...state, 
            loading: true 
        }
    }),
    on(loadedUsers, (state, {users}) => {
        return { ...state, 
            loading: false, 
            users: users 
        };
    })
)