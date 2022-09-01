import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user';
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
        catchError(this.handleError)
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

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Error del lado del cliente', error.error.message);
    } else {
      console.error('Error del lado del servidor', error.status, error.message)
      alert('Hubo un error de comunicación, intente de nuevo.');
    }
    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }
}
