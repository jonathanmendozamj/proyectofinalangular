import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Session } from '../models/session';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getSession().pipe(
      map((session: Session) => {
        if(session.isActive){
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getSession().pipe(
        map((session: Session) => {
          console.log(session);
          if(session.isActive){
            return true;
          }else{
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }
  
}
