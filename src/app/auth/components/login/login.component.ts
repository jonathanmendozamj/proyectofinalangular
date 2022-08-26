import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  users$!: Observable<any>;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.users$ = this.authService.getAllUsers();
  }

  onSubmitForm() {
    this.authService.login(this.formLogin.value).subscribe({
      next: (data) => {
        console.log(data);
        if(data) {
          this.router.navigate(['inicio']);
        } else {
          console.log("No puede loguearse");
        }
      },
      error: (error) => console.error(error),
      complete: () => console.log('Finalizó')
    });
  }
}
