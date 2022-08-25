import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CoursesService } from '../../services/courses.service';
import { CourseFormComponent } from '../course-form/course-form.component';

export interface Course {
  id: number;
  name: string;
  comission: number;
}

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
  displayedColumns: string[] = ['ID', 'Nombre', 'Comision', 'Acciones'];
  LIST_COURSES: Course[] = [];

  dataSource: MatTableDataSource<Course> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Course>;

  constructor(private dialog: MatDialog,
    private courseService: CoursesService) { 
    
  }

  ngOnInit(): void {
    //this.LIST_COURSES = this.courseService.getCourses();
    this.dataSource = new MatTableDataSource(this.LIST_COURSES);
  }

  edit(element: Course) {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        student: element,
        title: 'Modificar datos del estudiante',
        modify: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const item = this.dataSource.data.find(course => course.id === result.id);
        const index = this.dataSource.data.indexOf(item!);

        if(index >= 0) {
          this.dataSource.data[index] = result;
          this.tabla.renderRows();
        }
      }
    });
  }

  delete(element: Course) {

  }

  add() {
    let element: Course = {
      id: -1,
      name: '',
      comission: 0
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

  }

}
