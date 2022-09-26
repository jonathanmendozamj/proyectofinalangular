import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, Observable } from "rxjs";
import { Course } from "src/app/core/models/course.model";
import { Inscription } from "src/app/core/models/inscription.model";
import { Student } from "src/app/core/models/student.model";
import { CoursesService } from "src/app/courses/services/courses.service";
import { StudentsService } from "src/app/students/services/students.service";
import { InscriptionsService } from "../../services/inscriptions.service";
import * as InscriptionActions from "../actions/inscriptions.action";

@Injectable()
export class InscriptionEffects {
    courses: Course[] = [];
    students: Student[] = [];

    loadInscriptions$ = createEffect((): any => {
        this.coursesService.getAllCoursesNew().subscribe({
            next: (courses: Course[]) => {
              this.courses = courses;
            },
            error: (error: any) => {
              console.error(error);
            },
            complete: () => {
              console.log('Completado.');
            }
        });
      
        this.studentsService.getAllStudentsNew().subscribe({
            next: (students) => {
                this.students = students;
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                console.log('Completado.');
            }
        });

        return this.actions$.pipe(
            ofType(InscriptionActions.loadingInscriptions),
            mergeMap(() => this.inscriptionsService.getAllInscriptionsNew()
                .pipe(
                    map((inscriptions: Inscription[]) => InscriptionActions.loadedInscriptions({inscriptions: inscriptions}))
                ))
        );
    });

    constructor(
        private actions$: Actions,
        private inscriptionsService: InscriptionsService,
        private studentsService: StudentsService,
        private coursesService: CoursesService
    ) {

    }
}