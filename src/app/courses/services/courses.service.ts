import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import data from './../../../assets/courses.json';
import dataInscription from './../../../assets/inscriptions.json';
import dataStudents from './../../../assets/students.json';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesObservable: Observable<any>;
  private inscriptionsObservable!: Observable<any>;

  constructor() { 
    this.coursesObservable = new Observable<any>((subscriber) => {
      let courses = data;

      subscriber.next(courses);

      subscriber.complete();

      if(!Array.isArray(courses)) {
        subscriber.error({
          code: -1,
          message: 'No es un array.'
        });
      }

      if(courses.length === 0){
        subscriber.error({
          code: -1,
          message: 'No hay alumnos en este array.'
        });
      }
    });
  }

  getCourses() {
    return this.coursesObservable;
  }

  getInscriptions(commission: String) {
    this.inscriptionsObservable = new Observable<any>((subscriber) => {
      let inscriptionsForCourse = dataInscription.filter((item) => item.commission === commission);
      console.log(inscriptionsForCourse);

      let studentsPerCourse = inscriptionsForCourse.map((item) => dataStudents.find(student => item.dni === student.dni));
      console.log(studentsPerCourse);

      subscriber.next(studentsPerCourse);

      subscriber.complete();

      if(!Array.isArray(studentsPerCourse)) {
        subscriber.error({
          code: -1,
          message: 'No es un array.'
        });
      }

      if(studentsPerCourse.length === 0){
        subscriber.error({
          code: -1,
          message: 'No hay inscripciones para este curso.'
        });
      }
    });

    return this.inscriptionsObservable;
  }
}