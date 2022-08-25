import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import data from './../../../assets/courses.json';

export interface Course {
  id: number;
  name: string;
  commission: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private observableCourses: Observable<any>;
  private courses: any[] = data;

  constructor() { 
    this.observableCourses = new Observable<any>((subscriptor) => {
      subscriptor.next(this.courses);
      
      subscriptor.complete();

      if(this.courses.length === 0){
        subscriptor.error('Error');
      }
    });
  }

  getCourses() {
    return this.observableCourses;
  }
}
