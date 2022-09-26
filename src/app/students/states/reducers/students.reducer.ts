import { createReducer, on } from "@ngrx/store";
import { StudentState } from "src/app/core/models/student.state";
import { loadedStudents, loadingStudents } from "../actions/students.action";

const initialState: StudentState = {
    loading: false,
    students: []
}

export const STUDENTS_FEATURED_KEY = 'students';

export const studentsReducer = createReducer(
    initialState,
    on(loadingStudents, (state) => {
        return { 
            ...state, 
            loading: true 
        }
    }),
    on(loadedStudents, (state, {students}) => {
        return { ...state, 
            loading: false, 
            students: students 
        };
    })
)