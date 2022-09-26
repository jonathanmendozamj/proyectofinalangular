import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { Course } from "src/app/core/models/course.model";
import { CoursesService } from "../../services/courses.service";
import * as CourseActions from '../actions/courses.action';

@Injectable()
export class CourseEffects {
    loadCourses$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(CourseActions.loadingCourses),
            mergeMap(() => this.coursesService.getAllCoursesNew()
                .pipe(
                    map((courses: Course[]) => CourseActions.loadedCourses({courses: courses}))
                ))
        );
    });

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService
    ) {

    }
}