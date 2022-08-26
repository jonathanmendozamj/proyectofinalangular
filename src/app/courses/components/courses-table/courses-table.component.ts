import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course';
import { Session } from 'src/app/core/models/session';
import { AuthService } from 'src/app/core/services/auth.service';
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
    private courseService: CoursesService) { 
    
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
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
    }
    );

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
        const item = this.dataSource.data.find(course => course.commission === result.commission);
        const index = this.dataSource.data.indexOf(item!);

        if(index >= 0) {
          this.dataSource.data[index] = result;
          this.tabla.renderRows();
        }
      }
    });
  }

  delete(element: Course) {
    this.dataSource.data = this.dataSource.data.filter(course => course.commission !== element.commission);
  }

  add() {
    let element: Course = {
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
        this.dataSource.data.push(result);
        this.tabla.renderRows();
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
