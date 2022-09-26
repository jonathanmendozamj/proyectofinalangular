import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/core/models/course.model";

export const loadingCourses = createAction(
    '[Lista Cursos] Cargando cursos'
);

export const loadedCourses = createAction(
    '[Lista Cursos] Cursos cargados',
    props<{ courses: Course[] }>()
);