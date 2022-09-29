import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private sessionStore: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  showSnackBar() {
    alert('No tiene permisos de admin.');
  }

  isAdmin() {
    return this.sessionStore.select(sessionSelector).pipe(
      map((session: Session) => {
        if(session.user?.isAdmin) {
          return true;
        }
        
        this.showSnackBar();
        this.router.navigate(['/inicio']);

        return false;
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isAdmin();
  }
  
}
