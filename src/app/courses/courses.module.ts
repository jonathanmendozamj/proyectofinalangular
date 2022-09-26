import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesService } from './services/courses.service';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CoursesContainerComponent } from './components/courses-container/courses-container.component';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsService } from '../inscriptions/services/inscriptions.service';
import { StoreModule } from '@ngrx/store';

import * as FromCourse from './states/reducers/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './states/effects/courses.effect';

@NgModule({
  declarations: [
    CoursesTableComponent,
    CourseFormComponent,
    CourseDetailComponent,
    CoursesContainerComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      FromCourse.COURSES_FEATURED_KEY,
      FromCourse.coursesReducer
    ),
    EffectsModule.forFeature([CourseEffects]),
  ],
  providers: [
    CoursesService,
    InscriptionsService
  ]
})
export class CoursesModule { }