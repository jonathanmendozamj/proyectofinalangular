import { ActionReducerMap } from "@ngrx/store";
import { CourseState } from "src/app/core/models/course.state";
import { coursesReducer } from "./reducers/courses.reducer";

export interface AppState {
    courses: CourseState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    courses: coursesReducer
}