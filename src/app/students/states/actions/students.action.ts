import { createAction, props } from "@ngrx/store";
import { Student } from "src/app/core/models/student.model";

export const loadingStudents = createAction(
    '[Lista Estudiantes] Cargando estudiantes'
);

export const loadedStudents = createAction(
    '[Lista Estudiantes] Estudiantes cargados',
    props<{ students: Student[] }>()
);