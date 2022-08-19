import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: any[] = [];
  coursesSubscription!: Subscription;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesSubscription = this.coursesService.getCourses()
    .pipe(
      map((courses: any[]) => courses.filter(course => course.name.includes('a')))
    ).subscribe((courses) => {
      console.log("Entro a coursesSubscription()");
      this.courses = courses;
    });
  }

  ngOnDestroy(): void {
    console.log("Entro a ngOnDestroy()");
    this.coursesSubscription.unsubscribe();
  }
}
