import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { handleError } from 'src/app/shared/functions/handle-error';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) { 

  }

  public getAllUsers() {
    return this.http.get<User[]>(`${ API }/users`)
      .pipe(
        catchError(handleError)
      );
  }

  addUser(user: User) {
    return this.http.post<User>(`${ API }/users`, user)
      .pipe(
        catchError(handleError)
      );
  }

  modifyUser(user: User) {
    return this.http.put<User>(`${ API }/users/${ user.id }`, user)
      .pipe(
        catchError(handleError)
      );
  }

  deleteUser(user: User) {
    return this.http.delete<User>(`${ API }/users/${ user.id }`)
      .pipe(
        catchError(handleError)
      );
  }
}
