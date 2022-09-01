import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UsersService } from '../../services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';

export interface DialogDataUser {
  user: User,
  modify: boolean;
  title: string;
}

const WIDTH_DIALOG = '480px';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = ['Usuario', 'Tipo', 'Acciones'];
  LIST_USERS: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<User>;

  users$!: Observable<User[]>;

  constructor(private usersService: UsersService, 
    private dialog: MatDialog) { 

    }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        this.LIST_USERS = data as User[];
        this.dataSource = new MatTableDataSource(this.LIST_USERS);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });
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

}
