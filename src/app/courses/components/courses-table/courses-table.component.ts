import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { Session } from 'src/app/core/models/session.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { CoursesService } from '../../services/courses.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/core/models/course.state';
import { selectorLoadedCourses } from '../../states/selectors/courses.selector';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import * as CoursesAction from '../../states/actions/courses.action';

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
  courses$!: Observable<Course[]>;

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private inscriptionService: InscriptionsService,
    private coursesStore: Store<CourseState>,
    private courseService: CoursesService) { 
    
  }

  ngOnInit(): void {
    this.courses$ = this.coursesStore.select(selectorLoadedCourses);
    
    this.courses$.subscribe({
      next: (data: Course[]) => {
        this.LIST_COURSES = data;

        console.log(this.LIST_COURSES);
        this.dataSource = new MatTableDataSource(this.LIST_COURSES);
      },
      error: (error: any) => {
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

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Desea eliminar el curso ${ element.nameCourse }?`,
        buttonText: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      let hasInscriptions = this.inscriptionService.hasCourseInscriptions(element.id)
        .subscribe({
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
    });
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
        course: element,
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
