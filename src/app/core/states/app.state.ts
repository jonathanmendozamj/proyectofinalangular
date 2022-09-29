import { ActionReducerMap } from "@ngrx/store";
import { Session } from "../models/session.model";
import { SessionState } from "../models/session.state.model";
import { userReducer } from "./reducers/user.reducer";

export interface AppState {
    session: Session;
};

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    session: userReducer
};