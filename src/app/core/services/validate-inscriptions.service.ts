import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loadingInscriptions } from 'src/app/inscriptions/states/actions/inscriptions.action';
import { InscriptionSelector, selectorLoadedInscriptions } from 'src/app/inscriptions/states/selectors/inscriptions.selector';
import { Inscription } from '../models/inscription.model';
import { InscriptionState } from '../models/inscription.state';

@Injectable({
  providedIn: 'root'
})
export class ValidateInscriptionsService {

  inscriptions$!: Observable<Inscription[]>;

  constructor(
    private inscriptionsStore: Store<InscriptionState>
  ) {
    
  }

  getAllInscriptions() {
    this.inscriptions$ = this.inscriptionsStore.select(selectorLoadedInscriptions);

    return this.inscriptions$;
  }

  hasStudentInscriptions(idStudent: string): Observable<boolean> {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idStudent) === idStudent))
      );
  }

  hasCourseInscriptions(idCourse: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idCourse) === idCourse))
      );
  }

  hasUserMadeInscriptions(idUser: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idUser) === idUser))
      );
  }

  existsInscription(idCourse: String, idStudent: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idCourse) === idCourse && String(item.idStudent) === idStudent))
      );
  }
}
