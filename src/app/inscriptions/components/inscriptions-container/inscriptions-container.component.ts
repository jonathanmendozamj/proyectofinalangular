import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscriptionState } from 'src/app/core/models/inscription.state';
import { selectorLoadingInscriptions } from '../../states/selectors/inscriptions.selector';
import * as InscriptionsAction from '../../states/actions/inscriptions.action';

@Component({
  selector: 'app-inscriptions-container',
  templateUrl: './inscriptions-container.component.html',
  styleUrls: ['./inscriptions-container.component.css']
})
export class InscriptionsContainerComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private studentsStore: Store<InscriptionState>) { }

  ngOnInit(): void {
    this.studentsStore.dispatch(InscriptionsAction.loadingInscriptions());
    this.loading$ = this.studentsStore.select(selectorLoadingInscriptions);
  }

}
