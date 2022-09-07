import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, switchMap, tap } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { handleError } from 'src/app/shared/functions/handle-error';
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
        catchError(handleError)
      )
      .subscribe((courses) => {
        this.subject.next(courses);
      });
  }

  private getAllCoursesObservable() {
    return this.http.get<Course[]>(`${ API }/courses`)
      .pipe(
        catchError(handleError),
        tap(courses => this.subject.next(courses)),
      )
  }

  getAllCourses() {
    this.readCourses();
    return this.subject;
  }

  getCourse(id: String) {
    return this.http.get<Course>(`${ API }/courses/${ id }`);
  }

  addCourse(course: Course) {
    return this.http.post<Course>(`${ API }/courses`, course)
      .subscribe((newCourse) => {
        alert(`${ newCourse.id } - ${ newCourse.nameCourse } fue agregado satisfactoriamente.`);
        this.readCourses();
      });
  }

  modifyCourse(course: Course) {
    return this.http.put<Course>(`${ API }/courses/${ course.id }`, course)
      .subscribe((modifiedCourse) => {
        alert(`${ modifiedCourse.id } - ${ modifiedCourse.nameCourse } fue editado satisfactoriamente.`);
        this.readCourses();
      });
  }

  deleteCourse(id: String) {
    return this.http.delete<Course>(`${ API }/courses/${ id }`)
      .subscribe((deletedCourse) => {
        alert(`${ deletedCourse.id } - ${ deletedCourse.nameCourse } fue eliminado satisfactoriamente.`);
        this.readCourses();
      });
  }
}