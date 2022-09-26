import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "src/app/core/models/user.state";
import * as FromUsers from "../reducers/users.reducer";

export const selectorUser = (state: UserState) => state.users;

export const UserSelector = createFeatureSelector<UserState>(
    FromUsers.USERS_FEATURED_KEY
);

export const selectorLoadingUsers = createSelector(
    UserSelector,
    (state: UserState) => state.loading
);

export const selectorLoadedUsers = createSelector(
    UserSelector,
    (state: UserState) => state.users
)