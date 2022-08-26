import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(private authService: AuthService, 
    private dialog: MatDialog) { 

    }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
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
      user: '',
      password: '',
      profile: ''
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
        this.dataSource.data.push(result);
        this.tabla.renderRows();
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
        const item = this.dataSource.data.find(user => user.user === result.user);
        const index = this.dataSource.data.indexOf(item!);

        console.log(result);

        if(index >= 0) {
          this.dataSource.data[index] = result;
          this.tabla.renderRows();
        }
      }
    });
  }

}
