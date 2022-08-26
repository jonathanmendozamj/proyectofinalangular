import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from './services/students.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentPipe } from './pipes/student-pipe.pipe';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentsTableComponent,
    StudentPipe,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ],
  providers: [
    StudentsService
  ]
})
export class StudentsModule { }
