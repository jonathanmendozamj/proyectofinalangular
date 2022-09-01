import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course';
import { Session } from 'src/app/core/models/session';
import { AuthService } from 'src/app/core/services/auth.service';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { CoursesService } from '../../services/courses.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { CourseFormComponent } from '../course-form/course-form.component';

export interface DialogDataCourse {
  course: Course;
  title: string;
  modify: boolean;
}

const WIDTH_DIALOG = '480px';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Comision', 'Acciones'];
  LIST_COURSES: Course[] = [];

  dataSource: MatTableDataSource<Course> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Course>;

  session$!: Observable<Session>;

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private inscriptionService: InscriptionsService,
    private courseService: CoursesService) { 
    
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.LIST_COURSES = data as Course[];

        console.log(this.LIST_COURSES);
        this.dataSource = new MatTableDataSource(this.LIST_COURSES);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.session$ = this.authService.getSession();
  }

  edit(element: Course) {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        course: element,
        title: 'Modificar datos del curso',
        modify: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.modifyCourse(result);
      }
    });
  }

  delete(element: Course) {
    let hasInscriptions = this.inscriptionService.hasCourseInscriptions(element.id).subscribe({
      next: (hasInscriptions) => {
        if(!hasInscriptions) {
          this.courseService.deleteCourse(element.id);
        } else {
          alert("Este curso tiene inscripciones.");
        }
      },
      error: (error) => console.error(error),
      complete: () => console.log('Finalizó')
    });

    hasInscriptions.unsubscribe();
  }

  add() {
    let element: Course = {
      id: '',
      nameCourse: '',
      commission: ""
    }

    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        student: element,
        title: 'Agregar nuevo curso',
        modify: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.addCourse(result);
      }
    });
  }

  showDetail(element: Course) {
    const dialogRef = this.dialog.open(CourseDetailComponent, {
      width: WIDTH_DIALOG,
      data: {
        course: element,
        title: 'Ver detalle del curso',
        modify: true
      }
    });
  }
}
