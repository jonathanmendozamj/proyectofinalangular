import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InscriptionState } from "src/app/core/models/inscription.state";
import * as FromInscriptions from "../reducers/inscriptions.reducer";

export const selectorInscription = (state: InscriptionState) => state.inscriptions;

export const InscriptionSelector = createFeatureSelector<InscriptionState>(
    FromInscriptions.INSCRIPTIONS_FEATURED_KEY
);

export const selectorLoadingInscriptions = createSelector(
    InscriptionSelector,
    (state: InscriptionState) => state.loading
);

export const selectorLoadedInscriptions = createSelector(
    InscriptionSelector,
    (state: InscriptionState) => state.inscriptions
)