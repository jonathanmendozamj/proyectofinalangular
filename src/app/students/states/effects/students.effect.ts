import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { Student } from "src/app/core/models/student.model";
import { StudentsService } from "../../services/students.service";
import * as StudentActions from "../actions/students.action";

@Injectable()
export class StudentEffects {
    loadCourses$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(StudentActions.loadingStudents),
            mergeMap(() => this.studentsService.getAllStudentsNew()
                .pipe(
                    map((students: Student[]) => StudentActions.loadedStudents({students: students}))
                ))
        );
    });

    constructor(
        private actions$: Actions,
        private studentsService: StudentsService
    ) {

    }
}