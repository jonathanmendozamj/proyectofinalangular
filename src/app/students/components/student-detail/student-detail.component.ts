import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogDataStudent } from 'src/app/core/interfaces/dialog-data-student';
import { Inscription } from 'src/app/core/models/inscription.model';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';

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
    private dialog: MatDialog,
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Desea eliminar la inscripción al curso ${ element.nameCourse }?`,
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

      this.inscriptionsService.deleteInscription(element.id);
    });
  }

}