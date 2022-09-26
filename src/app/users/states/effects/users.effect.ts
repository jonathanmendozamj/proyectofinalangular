import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { UsersService } from "../../services/users.service";
import * as UserActions from "../actions/users.action";

@Injectable()
export class UserEffects {
    loadCourses$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(UserActions.loadingUsers),
            mergeMap(() => this.usersService.getAllUsersNew()
                .pipe(
                    map((users: User[]) => UserActions.loadedUsers({users: users}))
                ))
        );
    });

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) {

    }
}