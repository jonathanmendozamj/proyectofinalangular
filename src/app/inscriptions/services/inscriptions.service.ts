import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { StudentsService } from 'src/app/students/services/students.service';
import { Course } from 'src/app/core/models/course';
import { Student } from 'src/app/core/models/student';

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
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
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
        catchError(this.handleError)
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
    return this.http.post<Inscription>(`${ API }/inscriptions`, inscription).subscribe((inscription) => {
      alert(`${ inscription.id } - ${ inscription.idCourse } fue agregado satisfactoriamente.`);
      this.readInscriptions();
    });
  }

  modifyInscription(inscription: Inscription) {
    this.http.put<Inscription>(`${ API }/inscriptions/${ inscription.id }`, inscription).subscribe((inscription) => {
      alert(`${inscription.id} - ${ inscription.nameCourse } fue editado satisfactoriamente.`);
      this.readInscriptions();
    });
  }

  deleteInscription(id: String) {
    this.http.delete<Inscription>(`${ API }/inscriptions/${ id }`).subscribe((inscription) => {
      alert(`${ inscription.id } - ${ inscription.idCourse } - ${ inscription.idStudent } fue eliminado satisfactoriamente.`);
      this.readInscriptions();
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
