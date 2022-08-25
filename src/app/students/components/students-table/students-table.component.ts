import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentsService } from './../../services/students.service';
import { StudentFormComponent } from '../student-form/student-form.component';

export interface Student {
  name: string;
  surname: string;
  dni: string;
  mail: string;
  message: string;
}

export interface DialogDataStudent {
  student: Student;
  title: string;
  modify: boolean;
}

const WIDTH_DIALOG = '480px';

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

  constructor(private dialog: MatDialog,
    private studentsService: StudentsService) { 
      
  }

  ngOnInit(): void {
    this.LIST_STUDENTS = this.studentsService.getStudents();
    this.dataSource = new MatTableDataSource(this.LIST_STUDENTS);
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
        const item = this.dataSource.data.find(student => student.dni === result.dni);
        const index = this.dataSource.data.indexOf(item!);

        if(index >= 0) {
          this.dataSource.data[index] = result;
          this.tabla.renderRows();
        }
      }
    });
  }

  delete(element: Student) {
    this.dataSource.data = this.dataSource.data.filter(student => student.dni !== element.dni);
  }

  add() {
    let element: Student = {
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
      if(result){
        this.dataSource.data.push(result);
        this.tabla.renderRows();
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

  }
}
