import { Course } from "../models/course.model";

export interface DialogDataCourse {
    course: Course;
    title: string;
    modify: boolean;
};