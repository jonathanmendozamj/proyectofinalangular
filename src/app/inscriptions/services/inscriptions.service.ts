import { Injectable } from '@angular/core';
import data from './../../../assets/inscriptions.json';
import dataCourses from './../../../assets/courses.json';
import dataStudents from './../../../assets/students.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private inscriptionObservable: Observable<any>;

  constructor() { 
    this.inscriptionObservable = new Observable<any>((subscriber) => {
      let inscriptionsData = data.map(item => {
        let courseData = dataCourses.find(course => item.commission === course.commission);
        let studentData = dataStudents.find(student => item.dni === student.dni);
  
        return { 
          ...courseData, 
          ...studentData
        };
      });

      subscriber.next(inscriptionsData);

      subscriber.complete();

      if(!Array.isArray(inscriptionsData)) {
        subscriber.error({
          code: -1,
          message: 'No es un array.'
        });
      }

      if(inscriptionsData.length === 0){
        subscriber.error({
          code: -1,
          message: 'No hay inscripciones disponibles.'
        });
      }
    });
  }

  getInscriptions() {
    return this.inscriptionObservable;
  }
}
