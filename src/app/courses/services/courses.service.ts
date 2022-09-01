import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Course } from 'src/app/core/models/course';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private subject!: BehaviorSubject<Course[]>;
  
  constructor(private http: HttpClient) { 
    this.subject = new BehaviorSubject<Course[]>([]);
  }

  private readCourses() {
    this.http.get<Course[]>(`${ API }/courses`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((courses) => {
        this.subject.next(courses);
      });
  }

  getAllCourses() {
    this.readCourses();
    return this.subject;
  }

  getCourse(id: String) {
    return this.http.get<Course>(`${ API }/courses/${ id }`);
  }

  addCourse(course: Course) {
    return this.http.post<Course>(`${ API }/courses`, course).subscribe((course) => {
      alert(`${ course.id } - ${ course.nameCourse } fue agregado satisfactoriamente.`);
      this.readCourses();
    });
  }

  modifyCourse(course: Course) {
    this.http.put<Course>(`${ API }/courses/${ course.id }`, course).subscribe((course) => {
      alert(`${course.id} - ${ course.nameCourse } fue editado satisfactoriamente.`);
      this.readCourses();
    });
  }

  deleteCourse(id: String) {
    this.http.delete<Course>(`${ API }/courses/${id}`).subscribe((course) => {
      alert(`${ course.id } - ${ course.nameCourse } fue eliminado satisfactoriamente.`);
      this.readCourses();
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