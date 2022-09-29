import { createReducer, on } from "@ngrx/store";
import { SessionState } from "../../models/session.state.model";
import { closeSession, createSession, loadSesion } from "../actions/user.actions";

export const SESSION_FEATURE_KEY = 'session';

export const initialState: SessionState = {
    isActive: false,
    user: {
        id: '',
        user: '',
        name: '',
        address: '',
        phone: '',
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
    }),
    on(closeSession, (state) => {
        return { 
            ...state, 
            isActive: false,
            user: undefined
        };
    }),
    on(loadSesion, (state) => {
        return { 
            ...state, 
            active: false 
        };
    }),
);