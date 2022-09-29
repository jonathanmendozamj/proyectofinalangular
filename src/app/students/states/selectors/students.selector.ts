import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentState } from "src/app/core/models/student.state";
import * as FromStudents from '../reducers/students.reducer';

export const selectorStudent = (state: StudentState) => state.students;

export const StudentSelector = createFeatureSelector<StudentState>(
    FromStudents.STUDENTS_FEATURED_KEY
);

export const selectorLoadingStudents = createSelector(
    StudentSelector,
    (state: StudentState) => state.loading
);

export const selectorLoadedStudents = createSelector(
    StudentSelector,
    (state: StudentState) => state.students
)