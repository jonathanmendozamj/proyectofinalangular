import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const loadSesion = createAction('[Session] Sesión inactiva');
export const createSession = createAction(
    '[Auth Login] Sesión iniciada',
    props<{ user: User }>()
);
export const closeSession = createAction('[Session] Cerrar sesión');