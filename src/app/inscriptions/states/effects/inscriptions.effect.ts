import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { Inscription } from "src/app/core/models/inscription.model";
import { InscriptionsService } from "../../services/inscriptions.service";
import * as InscriptionActions from "../actions/inscriptions.action";

@Injectable()
export class InscriptionEffects {

    loadInscriptions$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(InscriptionActions.loadingInscriptions),
            mergeMap(() => this.inscriptionsService.getAllInscriptions()
                .pipe(
                    map((inscriptions: Inscription[]) => InscriptionActions.loadedInscriptions({inscriptions: inscriptions}))
                ))
        );
    });

    constructor(
        private actions$: Actions,
        private inscriptionsService: InscriptionsService
    ) {

    }
}