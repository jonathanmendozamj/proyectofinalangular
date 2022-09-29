import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataInscription } from 'src/app/core/interfaces/dialog-data-inscription';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrls: ['./inscription-detail.component.css']
})
export class InscriptionDetailComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InscriptionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataInscription) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

}
