import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadingInscriptions } from 'src/app/inscriptions/states/actions/inscriptions.action';
import { InscriptionState } from '../../models/inscription.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private inscriptionsStore: Store<InscriptionState>) { }

  ngOnInit(): void {
    this.inscriptionsStore.dispatch(loadingInscriptions());
  }

}
