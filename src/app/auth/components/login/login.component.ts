import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin!: FormGroup;
  users$!: Observable<User[]>;
  login$!: Observable<User>;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { 
      console.log('Constructor LoginComponent');
    }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    console.log('ngOnInit LoginComponent');
    this.formLogin = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.users$ = this.authService.getAllUsers();
    this.login$ = new Observable<User>();
  }

  onSubmitForm() {
    let login: Subscription = this.authService.login(this.formLogin.value).subscribe({
      next: (data: User) => {
        console.log(data);
        
        if(data) {
          this.router.navigate(['/inicio']);
        } else {
          console.log("No puede loguearse");
        }
      },
      error: (error: any) => console.error(error),
      complete: () => console.log('Finalizó el login de onSubmitForm')
    });
  }
}