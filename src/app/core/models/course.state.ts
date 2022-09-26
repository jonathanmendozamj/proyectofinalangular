import { Course } from "./course.model";

export interface CourseState {
    loading: boolean;
    courses: Course[];
};