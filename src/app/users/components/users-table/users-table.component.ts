import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/session.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from '../../services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { WIDTH_DIALOG } from 'src/app/shared/consts/consts';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { selectorLoadedUsers } from '../../states/selectors/users.selector';
import { Store } from '@ngrx/store';
import { loadingUsers } from '../../states/actions/users.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserState } from 'src/app/core/models/user.state';
import { sessionSelector } from 'src/app/core/states/selectors/user.selector';
import { AppState } from 'src/app/core/states/app.state';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ValidateInscriptionsService } from 'src/app/core/services/validate-inscriptions.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user', 'isAdmin', 'actions'];
  LIST_USERS: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<User>;
  @ViewChild(MatSort) sort!: MatSort;

  users$!: Observable<User[]>;
  session$!: Observable<Session | undefined>;

  constructor(private usersService: UsersService, 
    private sessionStore: Store<AppState>,
    private usersStore: Store<UserState>,
    private matSnackBar: MatSnackBar,
    private validateInscriptionsService: ValidateInscriptionsService,
    private dialog: MatDialog) { 

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.users$ = this.usersStore.select(selectorLoadedUsers);

    this.users$.subscribe({
      next: (data) => {
        this.LIST_USERS = data as User[];
        this.dataSource = new MatTableDataSource(this.LIST_USERS);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.matSnackBar.open(`Error! ${ error }`, 'Aceptar');
      }
    });

    this.session$ = this.sessionStore.select(sessionSelector);
  }

  add() {
    let user: User = {
      id: '',
      user: '',
      name: '',
      address: '',
      phone: '',
      password: '',
      isAdmin: false
    }

    const dialogRef = this.dialog.open(UserFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        user: user,
        title: 'Nuevo usuario',
        modify: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usersService.addUser(result as User)
          .subscribe((user) => {
            this.usersStore.dispatch(loadingUsers());
            this.matSnackBar.open(`El usuario ${ user.user } fue agregado exitosamente.`, 'Aceptar');
          });
      }
    });
  }

  edit(element: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: WIDTH_DIALOG,
      data: {
        user: element,
        title: 'Modificar contraseña',
        modify: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usersService.modifyUser(result as User)
          .subscribe((user) => {
            this.usersStore.dispatch(loadingUsers());
            this.matSnackBar.open(`Los datos del usuario ${ user.user } fueron editados exitosamente.`, 'Aceptar');
          });
      }
    });
  }

  delete(element: User)  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Desea eliminar el usuario ${ element.user }?`,
        buttonText: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      this.validateInscriptionsService.hasUserMadeInscriptions(element.id)
        .subscribe(hasUserMadeInscriptions => {
          if(hasUserMadeInscriptions) {
            this.usersService.deleteUser(element)
              .subscribe((user) => {
                this.usersStore.dispatch(loadingUsers());
                this.matSnackBar.open(`El usuario ${ user.user } fue eliminado exitosamente.`, 'Aceptar');
              });
          } else {
            this.matSnackBar.open(`Este usuario tiene inscripciones realizadas, por lo que no se puede eliminar.`, 'Aceptar');
          }
        });
      
    });
  }

  showDetail(element: User) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: WIDTH_DIALOG,
      data: {
        user: element,
        title: 'Ver detalle del usuario',
        modify: true
      }
    });
  }

}
