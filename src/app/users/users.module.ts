import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    UsersTableComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ], 
  providers: [UsersService]
})
export class UsersModule { }
