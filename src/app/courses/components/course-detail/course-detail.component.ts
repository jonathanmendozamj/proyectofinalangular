import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogDataCourse } from 'src/app/core/interfaces/dialog-data-course';
import { Inscription } from 'src/app/core/models/inscription.model';
import { InscriptionState } from 'src/app/core/models/inscription.state';
import { FilterInscriptionsService } from 'src/app/core/services/filter-inscriptions.service';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { loadingInscriptions } from 'src/app/inscriptions/states/actions/inscriptions.action';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Acciones'];
  LIST_INSCRIPTIONS: Inscription[] = [];

  loading$!: Observable<boolean>;

  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Inscription>;

  constructor(private dialogRef: MatDialogRef<CourseDetailComponent>,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataCourse,
    private inscriptionsStore: Store<InscriptionState>,
    private filterInscriptionsService: FilterInscriptionsService,
    private inscriptionsService: InscriptionsService) { 

  }

  ngOnInit(): void {
    this.filterInscriptionsService.getInscriptionsForCourse(this.dialogData.course?.id)
      .subscribe({
        next: (data: Inscription[]) => {
          this.LIST_INSCRIPTIONS = (data as Inscription[]);
          this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
        },
        error: (error) => {
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
        message: `¿Desea eliminar la inscripción del estudiante ${ element.name } ${ element.surname }?`,
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
        .subscribe((inscription: any) => {
          this.inscriptionsStore.dispatch(loadingInscriptions());
          this.matSnackBar.open(`La inscripción del estudiante fue eliminada exitosamente.`, 'Aceptar');
        });
    });
  }

}