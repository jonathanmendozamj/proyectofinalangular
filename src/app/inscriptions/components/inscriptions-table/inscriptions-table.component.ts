import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription.model';
import { Session } from 'src/app/core/models/session.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { InscriptionsService } from '../../services/inscriptions.service';
import { InscriptionDetailComponent } from '../inscription-detail/inscription-detail.component';
import { InscriptionFormComponent } from '../inscription-form/inscription-form.component';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.inscriptionService.getAllInscriptions().subscribe({
        next: (data: Inscription[]) => {
          this.LIST_INSCRIPTIONS = data;
          this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Completado.');
        }
      }
    );

    this.inscriptions$ = this.inscriptionService.getAllInscriptions();
    this.session$ = this.authService.getSession();
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
        let existsInscription = this.inscriptionService.existsInscription(result.idCourse, result.idStudent).subscribe({
          next: (existsInscription) => {
            if(!existsInscription) {
              this.inscriptionService.addInscription(result);
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
        title: 'Agregar nueva inscripción',
        modify: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.inscriptionService.modifyInscription(result);
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

      this.inscriptionService.deleteInscription(element.id);
    });
  }

}
