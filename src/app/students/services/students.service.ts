import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from 'src/app/core/models/student.model';
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/shared/functions/handle-error';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { 

  }

  getAllStudents() {
    return this.http.get<Student[]>(`${ API }/students`)
      .pipe(
        catchError(handleError)
      );
  }

  getStudent(id: String) {
    return this.http.get<Student>(`${ API }/students/${ id }`)
      .pipe(
        catchError(handleError)
      );
  }

  addStudent(student: Student) {
    return this.http.post<Student>(`${ API }/students`, student)
      .pipe(
        catchError(handleError)
      );
  }

  modifyStudent(student: Student) {
    return this.http.put<Student>(`${ API }/students/${ student.id }`, student)
      .pipe(
        catchError(handleError)
      );
  }

  deleteStudent(id: String) {
    return this.http.delete<Student>(`${ API }/students/${ id }`)
      .pipe(
        catchError(handleError)
      );
  }
}

