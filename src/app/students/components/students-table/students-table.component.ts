import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentsService } from './../../services/students.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { Student } from 'src/app/core/models/student.model';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/session.model';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectorLoadedStudents } from '../../states/selectors/students.selector';
import { Store } from '@ngrx/store';
import { StudentState } from 'src/app/core/models/student.state';
import { loadingStudents } from '../../states/actions/students.action';
import { sessionSelector } from 'src/app/core/states/selectors/user.selector';
import { AppState } from 'src/app/core/states/app.state';
import { ValidateInscriptionsService } from 'src/app/core/services/validate-inscriptions.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'DNI', 'Mail', 'Acciones'];
  LIST_STUDENTS: Student[] = [];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Student>;

  session$!: Observable<Session>;
  students$!: Observable<Student[]>;

  constructor(private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private sessionStore: Store<AppState>,
    private validateInscriptionsService: ValidateInscriptionsService,
    private inscriptionsService: InscriptionsService,
    private studentsStore: Store<StudentState>,
    private studentsService: StudentsService) { 
      
  }

  ngOnInit(): void {
    this.students$ = this.studentsStore.select(selectorLoadedStudents);

    this.students$.subscribe({
      next: (data) => {
        this.LIST_STUDENTS = data as Student[];
        this.dataSource = new MatTableDataSource(this.LIST_STUDENTS);
      },
      error: (error) => {
        this.matSnackBar.open(`Error! ${ error }`, 'Aceptar');
      }
    });

    this.session$ = this.sessionStore.select(sessionSelector)
  }

  edit(element: Student) {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        student: element,
        title: 'Modificar datos del estudiante',
        modify: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.studentsService.modifyStudent(result)
          .subscribe((student) => {
            this.studentsStore.dispatch(loadingStudents());
            this.matSnackBar.open(`Los datos del estudiante ${ student.name } ${ student.surname } fueron editados exitosamente.`, 'Aceptar');
          });
      }
    });
  }

  delete(element: Student) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Desea eliminar al estudiante ${ element.name } ${ element.surname }?`,
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

      let hasInscription$ = this.validateInscriptionsService.hasStudentInscriptions(element.id).subscribe({
        next: (hasInscriptions: boolean) => {
          if(!hasInscriptions) {
            this.studentsService.deleteStudent(element.id)
              .subscribe((student) => {
                this.studentsStore.dispatch(loadingStudents());
                this.matSnackBar.open(`El estudiante ${ student.name } ${ student.surname } fue eliminado exitosamente.`, 'Aceptar');
              });
          } else {
            this.matSnackBar.open("Este estudiante tiene inscripciones.", "Aceptar");
          }
        },
        error: (error) => this.matSnackBar.open(`Error! ${ error }`, 'Aceptar'),
      });
  
      hasInscription$.unsubscribe();
    });
  }

  add() {
    let element: Student = {
      id: '',
      name: '',
      surname: '',
      gender: '',
      dni: '',
      mail: '',
      message: ''
    }

    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        student: element,
        title: 'Agregar nuevo estudiante',
        modify: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.studentsService.addStudent(result)
          .subscribe((student) => {
            this.studentsStore.dispatch(loadingStudents());
            this.matSnackBar.open(`El estudiante ${ student.name } ${ student.surname } fue agregado exitosamente.`, 'Aceptar');
          });
      }
    });
  }

  showDetail(element: Student) {
    const dialogRef = this.dialog.open(StudentDetailComponent, {
      width: WIDTH_DIALOG,
      data: {
        student: element,
        title: 'Ver detalle del estudiante',
        modify: true
      }
    });
  }
}
