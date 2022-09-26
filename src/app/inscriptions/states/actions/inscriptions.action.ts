import { createAction, props } from "@ngrx/store";
import { Inscription } from "src/app/core/models/inscription.model";

export const loadingInscriptions = createAction(
    '[Lista Inscripciones] Cargando inscripciones'
);

export const loadedInscriptions = createAction(
    '[Lista Inscripciones] Inscripciones cargados',
    props<{ inscriptions: Inscription[] }>()
);