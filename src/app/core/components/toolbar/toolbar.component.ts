import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Session } from './../../models/session';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  session$!: Observable<Session>;

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.session$ = this.authService.getSession();
  }

  logout() {
    console.log("Entro a logout");
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log("Salio de logout");
  }

}
