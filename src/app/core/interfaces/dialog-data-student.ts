import { Student } from "../models/student.model";

export interface DialogDataStudent {
    student: Student;
    title: string;
    modify: boolean;
};