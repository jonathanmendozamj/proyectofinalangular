import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loadingInscriptions } from 'src/app/inscriptions/states/actions/inscriptions.action';
import { selectorLoadedInscriptions } from 'src/app/inscriptions/states/selectors/inscriptions.selector';
import { Inscription } from '../models/inscription.model';
import { InscriptionState } from '../models/inscription.state';

@Injectable({
  providedIn: 'root'
})
export class FilterInscriptionsService {

  private inscriptions$!: Observable<Inscription[]>;

  constructor(private inscriptionsStore: Store<InscriptionState>) {

  }

  getAllInscriptions() {
    this.inscriptions$ = this.inscriptionsStore.select(selectorLoadedInscriptions);

    return this.inscriptions$;
  }

  getInscriptionsForStudent(idStudent: string) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.filter(item => String(item.idStudent) === idStudent))
      );
  }

  getInscriptionsForCourse(idCourse: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.filter(item => String(item.idCourse) === idCourse))
      );
  }
}
