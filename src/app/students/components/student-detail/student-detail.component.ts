import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/inscription';
import { StudentsService } from '../../services/students.service';
import { DialogDataStudent } from '../students-table/students-table.component';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  studentInscription$: Promise<any> | undefined;
  LIST_INSCRIPTIONS: Inscription[] = [];

  displayedColumns: string[] = ['Curso', 'Acciones'];
  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Inscription>;

  constructor(private dialogRef: MatDialogRef<StudentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataStudent,
    private studentService: StudentsService) {

      
    }

  ngOnInit(): void {
    this.studentService.getInscriptions(this.dialogData.student?.dni).subscribe({
      next: (data) => {
        this.LIST_INSCRIPTIONS = data as Inscription[];
        this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  delete(element: Inscription) {
    this.dataSource.data = this.dataSource.data.filter(inscription => inscription.commission !== element.commission);
  }

}