import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription.model';
import { Session } from 'src/app/core/models/session.model';
import { InscriptionsService } from '../../services/inscriptions.service';
import { InscriptionDetailComponent } from '../inscription-detail/inscription-detail.component';
import { InscriptionFormComponent } from '../inscription-form/inscription-form.component';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectorLoadedInscriptions } from '../../states/selectors/inscriptions.selector';
import { loadingInscriptions } from '../../states/actions/inscriptions.action';
import { InscriptionState } from 'src/app/core/models/inscription.state';
import { sessionSelector } from 'src/app/core/states/selectors/user.selector';
import { AppState } from 'src/app/core/states/app.state';
import { ValidateInscriptionsService } from 'src/app/core/services/validate-inscriptions.service';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.css']
})
export class InscriptionsTableComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'DNI', 'Curso', 'Comision', 'Acciones'];
  LIST_INSCRIPTIONS: Inscription[] = [];
  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Inscription>;

  inscriptions$!: Observable<Inscription[]>;
  session$!: Observable<Session>;

  constructor(private inscriptionService: InscriptionsService,
    private validateInscriptionsService: ValidateInscriptionsService,
    private inscriptionsStore: Store<InscriptionState>,
    private matSnackBar: MatSnackBar,
    private sessionStore: Store<AppState>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.inscriptions$ = this.inscriptionsStore.select(selectorLoadedInscriptions);
    this.inscriptions$.subscribe({
        next: (data: Inscription[]) => {
          this.LIST_INSCRIPTIONS = data;
          this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
        },
        error: (error) => {
          this.matSnackBar.open(`Error! ${ error }`, 'Aceptar');
        }
      }
    );

    this.session$ = this.sessionStore.select(sessionSelector);
  }

  add() {
    let element = {
      name: '',
      surname: '',
      dni: '',
      comission: '',
      nameCourse: ''
    };

    const dialogRef = this.dialog.open(InscriptionFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        inscription: element,
        title: 'Agregar nueva inscripción',
        modify: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let existsInscription = this.validateInscriptionsService.existsInscription(result.idCourse, result.idStudent)
          .subscribe({
            next: (existsInscription) => {
              if(!existsInscription) {
                this.inscriptionService.addInscription(result)
                  .subscribe((inscription) => {
                    this.inscriptionsStore.dispatch(loadingInscriptions());
                    this.matSnackBar.open(`La inscripción del estudiante fue realizada exitosamente.`, 'Aceptar');
                  });
              } else {
                this.matSnackBar.open("Ya existe esta inscripción", "Aceptar");
              }
            },
            error: (error) => console.error(error)
          });

        existsInscription.unsubscribe();
      }
    });
  }

  showDetail(element: Inscription) {
    const dialogRef = this.dialog.open(InscriptionDetailComponent, {
      width: WIDTH_DIALOG,
      data: {
        inscription: element,
        title: 'Ver detalle de la inscripción',
        modify: false
      }
    });
  }

  edit(element: Inscription) {
    const dialogRef = this.dialog.open(InscriptionFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        inscription: element,
        title: 'Editar inscripción',
        modify: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.inscriptionService.modifyInscription(result)
          .subscribe((inscription) => {
            this.inscriptionsStore.dispatch(loadingInscriptions());
            this.matSnackBar.open(`La inscripción fue editada exitosamente.`, 'Aceptar');
          });
      }
    });
  }

  delete(element: Inscription) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Desea eliminar la inscripción del estudiante ${ element.name } ${ element.surname } al curso ${ element.nameCourse }?`,
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

      this.inscriptionService.deleteInscription(element.id)
        .subscribe((inscription) => {
          this.inscriptionsStore.dispatch(loadingInscriptions());
          this.matSnackBar.open(`La inscripción del estudiante fue eliminada exitosamente.`, 'Aceptar');
        });
    });
  }

}
