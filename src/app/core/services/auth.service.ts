import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { Session } from '../models/session';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionSubject!: BehaviorSubject<Session>;
  private subject!: BehaviorSubject<User[]>;

  constructor(private http: HttpClient, private router: Router)  { 
    const session: Session = {
      isActive: false
    };

    this.sessionSubject = new BehaviorSubject<Session>(session);
    this.subject = new BehaviorSubject<User[]>([]);
  }


  private readUsers() {
    this.http.get<User[]>(`${ API }/users`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((users) => {
        this.subject.next(users);
      });
  }

  public getAllUsers(): Observable<User[]>{
    this.readUsers();

    return this.subject;
  }

  public login(loginData: User) {
    let loginSubject = new Subject<User>();
    this.readUsers();

    this.subject
      .pipe(map((usuarios: User[]) => {
          return usuarios.filter((item: User) => item.user === loginData.user && item.password === loginData.password)[0];
        })
      )
      .subscribe((user: User) => {
        if(user) {
          const session: Session = {
            isActive: true,
            user: user
          };
      
          this.sessionSubject.next(session);

          loginSubject.next(user);

          this.router.navigate(['/inicio']);
        } else {
          loginSubject.error({
            code: -1,
            message: 'No puede loguearse.'
          });
        }
      });

    return loginSubject;
  }

  getSession(){
    return this.sessionSubject.asObservable();
  }

  logout(){
    const session: Session = {
      isActive: false
    };

    console.log(this.sessionSubject);
    this.sessionSubject.next(session);
    console.log(this.sessionSubject);
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
