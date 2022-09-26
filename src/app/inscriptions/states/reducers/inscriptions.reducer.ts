import { createReducer, on } from "@ngrx/store";
import { InscriptionState } from "src/app/core/models/inscription.state";
import { loadedInscriptions, loadingInscriptions } from "../actions/inscriptions.action";

const initialState: InscriptionState = {
    loading: false,
    inscriptions: []
}

export const INSCRIPTIONS_FEATURED_KEY = 'inscriptions';

export const inscriptionsReducer = createReducer(
    initialState,
    on(loadingInscriptions, (state) => {
        return { 
            ...state, 
            loading: true 
        }
    }),
    on(loadedInscriptions, (state, {inscriptions}) => {
        return { 
            ...state, 
            loading: false, 
            inscriptions: inscriptions 
        };
    })
)