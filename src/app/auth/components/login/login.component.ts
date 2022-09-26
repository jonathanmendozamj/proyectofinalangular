import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { createSession } from 'src/app/core/states/actions/user.actions';
import { AppState } from 'src/app/core/states/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  users$!: Observable<User[]>;
  
  constructor(private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService) { 
      
  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.users$ = this.authService.getAllUsers();
  }

  onSubmitForm() {
    let login$ = this.authService.login(this.formLogin.value)
      .subscribe({
        next: (data: User) => {
          console.log(data);
          
          if(data) {
            this.store.dispatch(createSession({user: data}));
            this.authService.setSession(data);
            this.router.navigate(['/inicio']);
          } else {
            this.matSnackBar.open("No puede loguearse", "Aceptar");
          }
        },
        error: (error: any) => console.error(error),
        complete: () => console.log('Finalizó el login de onSubmitForm')
      });

    login$.unsubscribe();
  }
}