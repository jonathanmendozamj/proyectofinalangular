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
  session$!: Observable<Session>;

  constructor(private usersService: UsersService, 
    private liveAnnouncer: LiveAnnouncer,
    private authService: AuthService,
    private dialog: MatDialog) { 

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${ sortState.direction } ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        this.LIST_USERS = data as User[];
        this.dataSource = new MatTableDataSource(this.LIST_USERS);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.session$ = this.authService.getSession();
  }

  add() {
    let user: User = {
      id: '',
      user: '',
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
        this.usersService.addUser(result as User);
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
        this.usersService.modifyUser(result as User);
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

      this.usersService.deleteUser(element);
    });
  }

}
