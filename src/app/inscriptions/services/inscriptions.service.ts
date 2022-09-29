import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { StudentsService } from 'src/app/students/services/students.service';
import { Course } from 'src/app/core/models/course.model';
import { Student } from 'src/app/core/models/student.model';
import { handleError } from 'src/app/shared/functions/handle-error';
import { UsersService } from 'src/app/users/services/users.service';
import { User } from 'src/app/core/models/user.model';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private courses: Course[] = [];
  private students: Student[] = [];
  private users: User[] = [];

  constructor(private http: HttpClient, 
    private usersService: UsersService,
    private studentsService: StudentsService,
    private coursesService: CoursesService) { 

  }

  getAllInscriptions() {
    this.coursesService.getAllCourses()
      .subscribe({
        next: (courses: Course[]) => {
          this.courses = courses;
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    this.studentsService.getAllStudents()
      .subscribe({
        next: (students) => {
          this.students = students;
        },
        error: (error) => {
          console.error(error);
        }
      });

    this.usersService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          console.error(error);
        }
      });

    this.usersService.getAllUsers()

    return this.http.get<Inscription[]>(`${ API }/inscriptions`)
      .pipe(
        catchError(handleError),
        map(inscriptions => inscriptions.map(
          item => {
            let courseData = this.courses.find(course => String(item.idCourse) === course.id);
            let studentData = this.students.find(student => String(item.idStudent) === student.id);
            let userData = this.users.find(user => String(item.idUser) === user.id);

            return { 
              ...item,
              ...courseData, 
              ...studentData,
              ...userData,
              dateInscription: (item.dateInscription * 1000),
              id: item.id
            };
          }
        ))
      );
  }

  addInscription(inscription: Inscription) {
    return this.http.post<Inscription>(`${ API }/inscriptions`, inscription)
      .pipe(
        catchError(handleError)
      );
  }

  modifyInscription(inscription: Inscription) {
    return this.http.put<Inscription>(`${ API }/inscriptions/${ inscription.id }`, inscription)
      .pipe(
        catchError(handleError)
      );
  }

  deleteInscription(id: String) {
    return this.http.delete<Inscription>(`${ API }/inscriptions/${ id }`)
      .pipe(
        catchError(handleError)
      );
  }
}
