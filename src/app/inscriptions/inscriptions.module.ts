import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './components/inscriptions/inscriptions.component';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { InscriptionsRouterModule } from './inscriptions-routing.module';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionsService } from './services/inscriptions.service';
import { InscriptionDetailComponent } from './components/inscription-detail/inscription-detail.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsTableComponent,
    InscriptionDetailComponent,
    InscriptionFormComponent,
  ],
  imports: [
    InscriptionsRouterModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    InscriptionsService
  ]
})
export class InscriptionsModule { }
