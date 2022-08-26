import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../models/session';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  session$!: Observable<Session>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.session$ = this.authService.getSession();
  }

}
