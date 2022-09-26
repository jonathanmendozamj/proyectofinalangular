import { Student } from "./student.model";

export interface StudentState {
    loading: boolean;
    students: Student[];
};