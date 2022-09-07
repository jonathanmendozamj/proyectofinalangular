import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/inscription.model';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { DialogDataCourse } from '../courses-table/courses-table.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Acciones'];
  LIST_INSCRIPTIONS: Inscription[] = [];

  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Inscription>;

  constructor(private dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataCourse,
    private inscriptionsService: InscriptionsService) { 

  }

  ngOnInit(): void {
    this.inscriptionsService.getInscriptionsForCourse(this.dialogData.course?.id)
      .subscribe({
        next: (data) => {
          this.LIST_INSCRIPTIONS = (data as Inscription[]);
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
    if(element) {
      this.inscriptionsService.deleteInscription(element.id);
    }
  }

}