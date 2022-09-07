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

  private subject!: BehaviorSubject<User[]>;
  
  constructor(private http: HttpClient) { 
    this.subject = new BehaviorSubject<User[]>([]);
  }

  private readUsers() {
    this.http.get<User[]>(`${ API }/users`)
      .pipe(
        catchError(handleError)
      )
      .subscribe((users: User[]) => {
        this.subject.next(users);
      });
  }

  public getAllUsers() {
    this.readUsers();

    return this.subject;
  }

  addUser(user: User) {
    return this.http.post<User>(`${ API }/users`, user).subscribe((newUser) => {
      alert(`${ newUser.id } - ${ newUser.user } fue agregado satisfactoriamente.`);
      this.readUsers();
    });
  }

  modifyUser(user: User) {
    this.http.put<User>(`${ API }/users/${ user.id }`, user).subscribe((modifiedUser) => {
      alert(`${ modifiedUser.id } - ${ modifiedUser.user } fue editado satisfactoriamente.`);
      this.readUsers();
    });
  }

  deleteUser(user: User) {
    this.http.delete<User>(`${ API }/users/${ user.id }`).subscribe((deletedUser) => {
      alert(`${ deletedUser.id } - ${ deletedUser.user } fue eliminado satisfactoriamente.`);
      this.readUsers();
    });
  }
}
