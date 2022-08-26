import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataUser } from '../users-table/users-table.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formUser!: FormGroup;

  constructor(private fb: FormBuilder, 
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataUser) { }

  ngOnInit(): void {
    console.log(this.dialogData);
    this.formUser = this.fb.group({
      user: [this.dialogData.user?.user, [Validators.required]],
      profile: [this.dialogData.user?.profile, [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    console.log(this.formUser.value);
    if(this.formUser.get('password')?.value === this.formUser.get('confirmPassword')?.value) {
      this.dialogRef.close(this.formUser.value);
    }
  }

}


