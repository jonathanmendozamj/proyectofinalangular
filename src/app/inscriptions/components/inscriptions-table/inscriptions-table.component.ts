import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from '../../services/inscriptions.service';
import { InscriptionDetailComponent } from '../inscription-detail/inscription-detail.component';
import { InscriptionFormComponent } from '../inscription-form/inscription-form.component';

export interface DialogDataInscription {
  inscription: Inscription;
  title: string;
  modify: boolean;
}

const WIDTH_DIALOG = '480px';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.css']
})
export class InscriptionsTableComponent implements OnInit {

  inscriptions$: Promise<any> | undefined;
  displayedColumns: string[] = ['Nombre', 'DNI', 'Curso', 'Comision', 'Acciones'];
  LIST_INSCRIPTIONS: Inscription[] = [];
  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Inscription>;

  constructor(private inscriptionService: InscriptionsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.inscriptionService.getInscriptions().subscribe({
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
      }
    );
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

        const item = this.dataSource.data.find(inscription => (inscription.dni === result.dni) && (inscription.commission === result.commission));
        const index = this.dataSource.data.indexOf(item!);

        if(index < 0) {
          this.dataSource.data.push(result);
          this.tabla.renderRows();
        }
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
        const item = this.dataSource.data.find(inscription => (inscription.dni === element.dni) && (inscription.commission === element.commission));
        const index = this.dataSource.data.indexOf(item!);

        const itemResult = this.dataSource.data.find(inscription => (inscription.dni === result.dni) && (inscription.commission === result.commission));
        const indexResult = this.dataSource.data.indexOf(itemResult!);

        if(index >= 0 && indexResult < 0) {
          this.dataSource.data[index] = result;
          this.tabla.renderRows();
        }
      }
    });
  }

  delete(element: Inscription) {
    this.dataSource.data = this.dataSource.data.filter(inscription => (inscription.dni !== element.dni || inscription.commission !== element.commission));
  }

}
