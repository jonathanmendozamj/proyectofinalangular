import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/inscription.model';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
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
    private inscriptionsService: InscriptionsService) {

    }

  ngOnInit(): void {
    let hasInscription = this.inscriptionsService.getInscriptionsForStudent(this.dialogData.student?.id).subscribe({
      next: (data: Inscription[]) => {
        this.LIST_INSCRIPTIONS = data as Inscription[];
        this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    hasInscription.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  delete(element: Inscription) {
    if(element) {
      this.inscriptionsService.deleteInscription(element.id);
    }
  }

}