import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDataUser } from 'src/app/core/interfaces/dialog-data-user';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formUser!: FormGroup;

  constructor(private fb: FormBuilder, 
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataUser) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      id: [this.dialogData.user?.id],
      user: [this.dialogData.user?.user, [Validators.required]],
      name: [this.dialogData.user?.name, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      address: [this.dialogData.user?.address, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      phone: [this.dialogData.user?.phone, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(5), Validators.maxLength(15)]],
      isAdmin: [this.dialogData.user?.isAdmin, [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    if(this.formUser.get('password')?.value === this.formUser.get('confirmPassword')?.value) {
      let newUser = this.formUser.value;
      delete newUser.confirmPassword;

      this.dialogRef.close(newUser as User);
    } else {
      this.matSnackBar.open(`Las contraseñas no son iguales`, 'Aceptar');
    }
  }

}


