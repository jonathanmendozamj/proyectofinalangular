import { ActionReducerMap } from "@ngrx/store";
import { InscriptionState } from "src/app/core/models/inscription.state";
import { inscriptionsReducer } from "./reducers/inscriptions.reducer";

export interface AppState {
    inscriptions: InscriptionState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    inscriptions: inscriptionsReducer
}