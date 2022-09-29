import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Session } from '../../models/session.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { closeSession } from '../../states/actions/user.actions';
import { AppState } from '../../states/app.state';
import { sessionSelector } from '../../states/selectors/user.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  session$!: Observable<Session>;

  constructor(private sessionStore: Store<AppState>,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.session$ = this.sessionStore.select(sessionSelector)
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Desea cerrar sesión?`,
        buttonText: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sessionStore.dispatch(closeSession());
        //this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

}
