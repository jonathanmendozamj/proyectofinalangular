import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Session } from '../../models/session.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  session$!: Observable<Session>;

  constructor(private authService: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title) { }

  ngOnInit(): void {
    this.session$ = this.authService.getSession();
  }

  setPageTitle() {
    let defaultPageTitle = '';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
  
        if (!child) {
          return this.activatedRoute.snapshot.data['title'] || defaultPageTitle;
        }
  
        while (child.firstChild) {
          child = child.firstChild;
        }
  
        if (child.snapshot.data['title']) {
          return child.snapshot.data['title'] || defaultPageTitle;
        }
      })
    )
    .subscribe((title: string) => this.title.setTitle(title));
  }

  getTitle() {
    return this.title.getTitle();
  }
}
