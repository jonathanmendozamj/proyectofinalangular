import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "src/app/core/models/course.state";
import * as FromCourses from '../reducers/courses.reducer';

export const selectorCourse = (state: CourseState) => state.courses;

export const CourseSelector = createFeatureSelector<CourseState>(
    FromCourses.COURSES_FEATURED_KEY
);

export const selectorLoadingCourses = createSelector(
    CourseSelector,
    (state: CourseState) => state.loading
);

export const selectorLoadedCourses = createSelector(
    CourseSelector,
    (state: CourseState) => state.courses
)