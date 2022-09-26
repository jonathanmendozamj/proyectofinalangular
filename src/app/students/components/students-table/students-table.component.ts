import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentsService } from './../../services/students.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { Student } from 'src/app/core/models/student.model';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/session.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private authService: AuthService,
    private inscriptionsService: InscriptionsService,
    private studentsService: StudentsService) { 
      
  }

  ngOnInit(): void {
    this.studentsService.getAllStudents().subscribe({
      next: (data) => {
        this.LIST_STUDENTS = data as Student[];
        this.dataSource = new MatTableDataSource(this.LIST_STUDENTS);
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
        this.studentsService.modifyStudent(result);
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

      let hasInscription$ = this.inscriptionsService.hasStudentInscriptions(element.id).subscribe({
        next: (hasInscriptions: boolean) => {
          if(!hasInscriptions) {
            this.studentsService.deleteStudent(element.id);
          } else {
            this.matSnackBar.open("Este estudiante tiene inscripciones.", "Aceptar");
          }
        },
        error: (error) => console.error(error),
        complete: () => console.log('Finalizó')
      });
  
      hasInscription$.unsubscribe();
    });
  }

  add() {
    let element: Student = {
      id: '',
      name: '',
      surname: '',
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
        this.studentsService.addStudent(result);
      }
    });
  }

  filter(event: Event) {
    console.log(event);
    let obtainedValue = (event.target as HTMLInputElement).value;
    obtainedValue = obtainedValue.trim().toLocaleLowerCase();
    console.log(obtainedValue);
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
