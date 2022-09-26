import { createReducer, on } from "@ngrx/store";
import { CourseState } from "src/app/core/models/course.state";
import { loadingCourses, loadedCourses } from "../actions/courses.action";

const initialState: CourseState = {
    loading: false,
    courses: []
}

export const COURSES_FEATURED_KEY = 'courses';

export const coursesReducer = createReducer(
    initialState,
    on(loadingCourses, (state) => {
        return { 
            ...state, 
            loading: true 
        }
    }),
    on(loadedCourses, (state, {courses}) => {
        return { ...state, 
            loading: false, 
            courses: courses 
        };
    })
)