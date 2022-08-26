import { Injectable } from '@angular/core';
import data from './../../../assets/students.json';
import dataInscription from './../../../assets/inscriptions.json';
import dataCourses from './../../../assets/courses.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentsObservable: Observable<any>;
  private inscriptionsObservable!: Observable<any>;

  constructor() { 
    this.studentsObservable = new Observable<any>((subscriber) => {
      let students = data;

      subscriber.next(students);

      subscriber.complete();

      if(!Array.isArray(students)) {
        subscriber.error({
          code: -1,
          message: 'No es un array.'
        });
      }

      if(students.length === 0){
        subscriber.error({
          code: -1,
          message: 'No hay alumnos en este array.'
        });
      }
    });
  }

  getStudents() {
    return this.studentsObservable;
  }

  getInscriptions(dni: String) {
    this.inscriptionsObservable = new Observable<any>((subscriber) => {
      let inscriptionsForStudent = dataInscription.filter((item) => item.dni === dni);
      console.log(inscriptionsForStudent);

      let studentsPerCourse = inscriptionsForStudent.map((item) => dataCourses.find(course => item.commission == course.commission));
      console.log(studentsPerCourse);

      subscriber.next(studentsPerCourse);

      subscriber.complete();

      if(!Array.isArray(studentsPerCourse)) {
        subscriber.error({
          code: -1,
          message: 'No hay alumnos en este array.'
        });
      }

      if(studentsPerCourse.length === 0){
        subscriber.error({
          code: -1,
          message: 'No hay inscripciones para este alumno.'
        });
      }
    });

    return this.inscriptionsObservable;
  }
}