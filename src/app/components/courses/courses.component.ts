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
  courses$!: Observable<any>;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.courses$ = this.coursesService.getCourses();
  }

  ngOnDestroy(): void {
    console.log("Entro a ngOnDestroy()");
    this.coursesSubscription.unsubscribe();
  }
}
