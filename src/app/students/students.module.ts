import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from './services/students.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsService } from '../inscriptions/services/inscriptions.service';
import { StudentsContainerComponent } from './components/students-container/students-container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './states/effects/students.effect';
import * as FromStudents from './states/reducers/students.reducer';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentsTableComponent,
    StudentDetailComponent,
    StudentsContainerComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      FromStudents.STUDENTS_FEATURED_KEY,
      FromStudents.studentsReducer
    ),
    EffectsModule.forFeature([StudentEffects]),
  ],
  providers: [
    StudentsService,
    InscriptionsService
  ]
})
export class StudentsModule { }
