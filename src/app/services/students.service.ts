import { Injectable } from '@angular/core';
import data from './../../assets/students.json';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { 
    
  }

  getStudents() {
    console.log(data);
    return data;
  }

  getStudentsPromise() {
    return new Promise((resolve, reject) => {
      if(data.length > 0){
        resolve(data);
      } else {
        reject({
          codigo: -1,
          mensaje: 'No hay alumnos en este array.'
        });
      }
    });
  }
}