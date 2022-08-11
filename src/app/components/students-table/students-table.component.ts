import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentFormComponent } from '../student-form/student-form.component';
import data from './../../../assets/students.json';


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

const LIST_STUDENTS: Student[] = data;

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'DNI', 'Mail', 'Acciones'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource(LIST_STUDENTS);
  @ViewChild(MatTable) tabla!: MatTable<Student>;

  constructor(private dialog: MatDialog) { 

  }

  ngOnInit(): void {
  }

  edit(element: Student) {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '480px',
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
        console.log('El index es ' + index);

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
    let element = {
      name: '',
      surname: '',
      dni: '',
      mail: '',
      message: ''
    }

    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '480px',
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
}
