import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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

const LIST_STUDENTS: Student[] = [
  {
    name: "Juan",
    surname: "Perez",
    dni: "32102541",
    mail: "juanperez@coderhouse.com",
    message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis saepe natus unde mollitia soluta."
  }, 
  {
    name: "Armando",
    surname: "González",
    dni: "32159748",
    mail: "armando.gonzalez@gmail.com",
    message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis saepe natus unde mollitia soluta. Animi libero maxime voluptatum illum incidunt. Blanditiis porro molestias at cum officiis perferendis mollitia sequi dolor."
  },
  {
    name: "Elio",
    surname: "Marchand",
    dni: "32140953",
    mail: "elio.marchand@example.com",
    message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis saepe natus unde mollitia soluta. Animi libero maxime voluptatum illum incidunt. Blanditiis porro molestias at cum officiis perferendis mollitia sequi dolor."
  },
  {
    name: "Soledad",
    surname: "Ramos",
    dni: "3125412",
    mail: "soledad.ramos@example.com",
    message: ""
  },
  {
    name: "Isabel",
    surname: "Hernandez",
    dni: "32001458",
    mail: "isabel.hernandez@example.com",
    message: ""
  }
];

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
