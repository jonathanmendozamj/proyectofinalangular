import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

export const loadingUsers = createAction(
    '[Lista Usuarios] Cargando usuarios'
);

export const loadedUsers = createAction(
    '[Lista Usuarios] Usuarios cargados',
    props<{ users: User[] }>()
);