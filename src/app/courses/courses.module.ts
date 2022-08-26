import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesService } from './services/courses.service';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoursesTableComponent,
    CourseFormComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule { }
