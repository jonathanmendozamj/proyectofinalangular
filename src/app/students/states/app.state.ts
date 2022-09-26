import { ActionReducerMap } from "@ngrx/store";
import { StudentState } from "src/app/core/models/student.state";
import { studentsReducer } from "./reducers/students.reducer";

export interface AppState {
    students: StudentState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    students: studentsReducer
}