import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from './services/students.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsService } from '../inscriptions/services/inscriptions.service';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentsTableComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ],
  providers: [
    StudentsService,
    InscriptionsService
  ]
})
export class StudentsModule { }
