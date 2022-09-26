import { createReducer, on } from "@ngrx/store";
import { SessionState } from "../../models/session.state.model";
import { createSession } from "../actions/user.actions";

export const SESSION_FEATURE_KEY = 'session';

export const initialState: SessionState = {
    isActive: false,
    user: {
        id: '',
        user: '',
        password: '',
        isAdmin: false
    }
};

export const userReducer = createReducer(
    initialState,
    on(createSession, (state, {user}) => {
        return { 
            ...state, 
            isActive: true, 
            user 
        };
    })
);