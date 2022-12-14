import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataStudent } from 'src/app/core/interfaces/dialog-data-student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})

export class StudentFormComponent implements OnInit {

  formStudent!: FormGroup; 
  genders: string[] = ['masculino', 'femenino', 'otros'];

  constructor(private fb: FormBuilder, 
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataStudent) {
    
  }

  ngOnInit(): void {
    this.formStudent = this.fb.group({
      id: [this.dialogData.student?.id],
      name: [this.dialogData.student?.name, [Validators.required, Validators.maxLength(80)]],
      surname: [this.dialogData.student?.surname, [Validators.required, Validators.maxLength(80)]],
      dni: [this.dialogData.student?.dni, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(6), Validators.maxLength(8)]],
      mail: [this.dialogData.student?.mail, [Validators.required, Validators.email]],
      gender: [this.dialogData.student?.gender, [Validators.required]],
      message: [this.dialogData.student?.message, [Validators.maxLength(500)]]
    });
  }

  update() {
    this.dialogRef.close(this.formStudent.value);
  }

  close() {
    this.dialogRef.close();
  }
}
