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

  //private studentsObservable: Observable<any>;
  private inscriptionsObservable!: Observable<any>;
  private subject!: BehaviorSubject<Student[]>;

  constructor(private http: HttpClient) { 
    this.subject = new BehaviorSubject<Student[]>([]);
  }

  private readStudents() {
    this.http.get<Student[]>(`${ API }/students`)
      .pipe(
        catchError(handleError)
      )
      .subscribe((students) => {
        this.subject.next(students);
      });
  }

  getAllStudents() {
    this.readStudents();
    return this.subject;
  }

  getStudent(id: String) {
    return this.http.get<Student>(`${ API }/students/${ id }`);
  }

  addStudent(student: Student) {
    return this.http.post<Student>(`${ API }/students`, student).subscribe((newStudent) => {
      alert(`${ newStudent.id } - ${ newStudent.name } fue agregado satisfactoriamente.`);
      this.readStudents();
    });
  }

  modifyStudent(student: Student) {
    this.http.put<Student>(`${ API }/students/${ student.id }`, student).subscribe((modifiedStudent) => {
      alert(`${ modifiedStudent.id } - ${ modifiedStudent.name } fue editado satisfactoriamente.`);
      this.readStudents();
    });
  }

  deleteStudent(id: String) {
    this.http.delete<Student>(`${ API }/students/${ id }`).subscribe((deletedStudent) => {
      alert(`${ deletedStudent.id } - ${ deletedStudent.name } fue eliminado satisfactoriamente.`);
      this.readStudents();
    });
  }
}

