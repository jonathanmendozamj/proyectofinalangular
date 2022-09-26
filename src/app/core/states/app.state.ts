import { ActionReducerMap } from "@ngrx/store";
import { SessionState } from "../models/session.state.model";
import { userReducer } from "./reducers/user.reducer";

export interface AppState {
    session: SessionState;
};

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    session: userReducer
};