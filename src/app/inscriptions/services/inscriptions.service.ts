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

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private subject!: BehaviorSubject<Inscription[]>;

  private courses: Course[] = [];
  private students: Student[] = [];

  constructor(private http: HttpClient, 
    private studentsService: StudentsService,
    private coursesService: CoursesService) { 

    this.subject = new BehaviorSubject<Inscription[]>([]);
  }

  private readInscriptions() {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.studentsService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.http.get<Inscription[]>(`${ API }/inscriptions`)
      .pipe(
        catchError(handleError)
      )
      .subscribe((inscriptions) => {
        let inscriptionsData = inscriptions.map(item => {
          let courseData = this.courses.find(course => String(item.idCourse) === course.id);
          let studentData = this.students.find(student => String(item.idStudent) === student.id);

          /*console.log(courseData);
          console.log(studentData);*/

          return { 
            ...item,
            ...courseData, 
            ...studentData,
            id: item.id
          };
        });

        this.subject.next(inscriptionsData);
      });
  }

  getAllInscriptions() {
    this.readInscriptions();
    return this.subject;
  }

  getAllInscriptionsNew() {
    return this.http.get<Inscription[]>(`${ API }/inscriptions`)
    .pipe(
      catchError(handleError)
    );
  }

  hasStudentInscriptions(idStudent: string): Observable<boolean> {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idStudent) === idStudent))
      );
  }

  hasCourseInscriptions(idCourse: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idCourse) === idCourse))
      );
  }

  existsInscription(idCourse: String, idStudent: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.some(item => String(item.idCourse) === idCourse && String(item.idStudent) === idStudent))
      );
  }

  getInscriptionsForStudent(idStudent: string) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.filter(item => String(item.idStudent) === idStudent))
      );
  }

  getInscriptionsForCourse(idCourse: String) {
    return this.getAllInscriptions()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.filter(item => String(item.idCourse) === idCourse))
      );
  }

  addInscription(inscription: Inscription) {
    return this.http.post<Inscription>(`${ API }/inscriptions`, inscription).subscribe((newInscription) => {
      alert(`${ newInscription.id } - ${ newInscription.idCourse } fue agregado satisfactoriamente.`);
      this.readInscriptions();
    });
  }

  modifyInscription(inscription: Inscription) {
    this.http.put<Inscription>(`${ API }/inscriptions/${ inscription.id }`, inscription).subscribe((modifiedInscription) => {
      alert(`${ modifiedInscription.id } - ${ modifiedInscription.nameCourse } fue editado satisfactoriamente.`);
      this.readInscriptions();
    });
  }

  deleteInscription(id: String) {
    this.http.delete<Inscription>(`${ API }/inscriptions/${ id }`).subscribe((deletedInscription) => {
      alert(`${ deletedInscription.id } - ${ deletedInscription.idCourse } - ${ deletedInscription.idStudent } fue eliminado satisfactoriamente.`);
      this.readInscriptions();
    });
  }
}
