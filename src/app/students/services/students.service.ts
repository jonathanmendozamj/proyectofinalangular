import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from 'src/app/core/models/student';
import { environment } from 'src/environments/environment';

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
        catchError(this.handleError)
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
    return this.http.post<Student>(`${ API }/students`, student).subscribe((student) => {
      alert(`${ student.id } - ${ student.name } fue agregado satisfactoriamente.`);
      this.readStudents();
    });
  }

  modifyStudent(student: Student) {
    this.http.put<Student>(`${ API }/students/${ student.id }`, student).subscribe((newStudent) => {
      alert(`${newStudent.id} - ${ newStudent.name } fue editado satisfactoriamente.`);
      this.readStudents();
    });
  }

  deleteStudent(id: String) {
    this.http.delete<Student>(`${ API }/students/${id}`).subscribe((student) => {
      alert(`${ student.id } - ${ student.name } fue eliminado satisfactoriamente.`);
      this.readStudents();
    });
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Error del lado del cliente', error.error.message);
    } else {
      console.error('Error del lado del servidor', error.status, error.message)
      alert('Hubo un error de comunicación, intente de nuevo.');
    }
    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }
}

