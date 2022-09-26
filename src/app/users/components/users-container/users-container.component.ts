import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/core/models/user.state';
import * as UsersAction from '../../states/actions/users.action';
import { selectorLoadingUsers } from '../../states/selectors/users.selector';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private usersStore: Store<UserState>) { }

  ngOnInit(): void {
    this.usersStore.dispatch(UsersAction.loadingUsers());
    this.loading$ = this.usersStore.select(selectorLoadingUsers);
  }

}
