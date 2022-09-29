import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { AuthService } from '../services/auth.service';
import { AppState } from '../states/app.state';
import { sessionSelector } from '../states/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private sessionStore: Store<AppState>,
    private router: Router) {

  }

  getSession() {
    return this.sessionStore.select(sessionSelector)
      .pipe(
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
