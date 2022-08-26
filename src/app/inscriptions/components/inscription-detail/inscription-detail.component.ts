import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogDataInscription } from '../inscriptions-table/inscriptions-table.component';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrls: ['./inscription-detail.component.css']
})
export class InscriptionDetailComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InscriptionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataInscription) { }

  ngOnInit(): void {
    console.log(this.dialogData);
  }

  close() {
    this.dialogRef.close();
  }

}
