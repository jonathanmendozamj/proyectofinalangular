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
  constructor(private http: HttpClient) { 

  }

  getAllCourses() {
    return this.http.get<Course[]>(`${ API }/courses`)
      .pipe(
        catchError(handleError)
      );
  }

  getCourse(id: String) {
    return this.http.get<Course>(`${ API }/courses/${ id }`)
      .pipe(
        catchError(handleError)
      );
  }

  addCourse(course: Course) {
    return this.http.post<Course>(`${ API }/courses`, course)
      .pipe(
        catchError(handleError)
      );
  }

  modifyCourse(course: Course) {
    return this.http.put<Course>(`${ API }/courses/${ course.id }`, course)
      .pipe(
        catchError(handleError)
      );
  }

  deleteCourse(id: String) {
    return this.http.delete<Course>(`${ API }/courses/${ id }`)
      .pipe(
        catchError(handleError)
      );
  }
}