import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "src/app/core/models/user.state";
import { usersReducer } from "./reducers/users.reducer";

export interface AppState {
    users: UserState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    users: usersReducer
}