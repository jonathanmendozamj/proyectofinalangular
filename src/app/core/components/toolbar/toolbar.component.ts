import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Session } from '../../models/session.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  session$!: Observable<Session>;

  constructor(private authService: AuthService, 
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.session$ = this.authService.getSession();
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
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

}
