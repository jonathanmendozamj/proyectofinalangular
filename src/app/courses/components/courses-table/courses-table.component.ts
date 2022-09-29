import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';
import { Session } from 'src/app/core/models/session.model';
import { CoursesService } from '../../services/courses.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/core/models/course.state';
import { selectorLoadedCourses } from '../../states/selectors/courses.selector';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import * as CoursesAction from '../../states/actions/courses.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from 'src/app/core/states/app.state';
import { sessionSelector } from 'src/app/core/states/selectors/user.selector';
import { ValidateInscriptionsService } from 'src/app/core/services/validate-inscriptions.service';

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
    private matSnackBar: MatSnackBar,
    private validateInscriptionsService: ValidateInscriptionsService,
    private coursesStore: Store<CourseState>,
    private sessionStore: Store<AppState>,
    private courseService: CoursesService) { 
    
  }

  ngOnInit(): void {
    this.courses$ = this.coursesStore.select(selectorLoadedCourses);
    
    this.courses$.subscribe({
      next: (data: Course[]) => {
        this.LIST_COURSES = data;
        this.dataSource = new MatTableDataSource(this.LIST_COURSES);
      },
      error: (error: any) => {
        this.matSnackBar.open(`Error! ${ error }`, 'Aceptar');
      }
    });

    this.session$ = this.sessionStore.select(sessionSelector);
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
        this.courseService.modifyCourse(result)
          .subscribe((course) => {
            this.coursesStore.dispatch(CoursesAction.loadingCourses());
            this.matSnackBar.open(`Los datos del curso ${ course.nameCourse } fueron editados exitosamente.`, 'Aceptar');
          });
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

      let hasInscriptions = this.validateInscriptionsService.hasCourseInscriptions(element.id)
        .subscribe({
          next: (hasInscriptions) => {
            if(!hasInscriptions) {
              this.courseService.deleteCourse(element.id)
                .subscribe((course) => {
                  this.coursesStore.dispatch(CoursesAction.loadingCourses());
                  this.matSnackBar.open(`El curso ${ course.nameCourse } fue eliminado exitosamente.`, 'Aceptar');
                });
            } else {
              this.matSnackBar.open(`Este curso tiene inscripciones.`, 'Aceptar');
            }
          },
          error: (error) => this.matSnackBar.open(`Error! ${ error }`, 'Aceptar')
        });

      hasInscriptions.unsubscribe();
    });
  }

  add() {
    let element: Course = {
      id: '',
      nameCourse: '',
      countHours: '',
      countClasses: '',
      professor: '',
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
        this.courseService.addCourse(result)
          .subscribe((course) => {
            this.coursesStore.dispatch(CoursesAction.loadingCourses());
            this.matSnackBar.open(`El curso ${ course.nameCourse } fue agregado exitosamente.`, 'Aceptar');
          });
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
