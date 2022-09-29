import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogDataStudent } from 'src/app/core/interfaces/dialog-data-student';
import { Inscription } from 'src/app/core/models/inscription.model';
import { InscriptionState } from 'src/app/core/models/inscription.state';
import { FilterInscriptionsService } from 'src/app/core/services/filter-inscriptions.service';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { loadingInscriptions } from 'src/app/inscriptions/states/actions/inscriptions.action';

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
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataStudent,
    private filterInscriptionsService: FilterInscriptionsService,
    private inscriptionsStore: Store<InscriptionState>,
    private inscriptionsService: InscriptionsService) {

  }

  ngOnInit(): void {
    this.filterInscriptionsService.getInscriptionsForStudent(this.dialogData.student?.id)
      .subscribe({
        next: (data: Inscription[]) => {
          this.LIST_INSCRIPTIONS = data as Inscription[];
          this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
        },
        error: (error: any) => {
          this.matSnackBar.open(`Error! ${ error }`, 'Aceptar');
        }
      });
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

      this.inscriptionsService.deleteInscription(element.id)
        .subscribe((inscription) => {
          this.inscriptionsStore.dispatch(loadingInscriptions());
          this.matSnackBar.open(`La inscripción del estudiante fue eliminada exitosamente.`, 'Aceptar');
        });
    });
  }

}