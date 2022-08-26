import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Session } from '../models/session';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, 
    private router: Router) {

  }

  getSession() {
    return this.authService.getSession().pipe(
      map((session: Session) => {
        console.log(session);
        if(session.user?.profile === 'admin'){
          return true;
        } else {
          alert('No tiene permisos de admin.');
          this.router.navigate(['/inicio']);
          return false;
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getSession();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getSession();
  }
  
}
