import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseState } from 'src/app/core/models/course.state';
import * as CoursesAction from '../../states/actions/courses.action';
import { selectorLoadingCourses } from '../../states/selectors/courses.selector';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private coursesStore: Store<CourseState>) { }

  ngOnInit(): void {
    this.coursesStore.dispatch(CoursesAction.loadingCourses());
    this.loading$ = this.coursesStore.select(selectorLoadingCourses);
  }
}
