import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { InscriptionsRouterModule } from './inscriptions-routing.module';
import { InscriptionsService } from './services/inscriptions.service';
import { InscriptionDetailComponent } from './components/inscription-detail/inscription-detail.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesService } from '../courses/services/courses.service';
import { StudentsService } from '../students/services/students.service';
import { InscriptionsContainerComponent } from './components/inscriptions-container/inscriptions-container.component';

@NgModule({
  declarations: [
    InscriptionsTableComponent,
    InscriptionDetailComponent,
    InscriptionFormComponent,
    InscriptionsContainerComponent,
  ],
  imports: [
    InscriptionsRouterModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    InscriptionsService,
    CoursesService,
    StudentsService
  ]
})
export class InscriptionsModule { }
