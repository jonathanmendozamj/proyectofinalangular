import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from './services/users.service';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './states/effects/users.effect';
import * as FromCourse from './states/reducers/users.reducer';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UsersTableComponent,
    UserFormComponent,
    UsersContainerComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      FromCourse.USERS_FEATURED_KEY,
      FromCourse.usersReducer
    ),
    EffectsModule.forFeature([UserEffects]),
  ], 
  providers: [UsersService]
})
export class UsersModule { }
