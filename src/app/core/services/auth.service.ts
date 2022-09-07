import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Session } from '../models/session.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/shared/functions/handle-error';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionSubject!: BehaviorSubject<Session>;
  private subject!: BehaviorSubject<User[]>;

  constructor(private http: HttpClient)  { 
    const session: Session = {
      isActive: false
    };

    this.sessionSubject = new BehaviorSubject<Session>(session);
    this.subject = new BehaviorSubject<User[]>([]);
  }

  private readUsers() {
    this.http.get<User[]>(`${ API }/users`)
      .pipe(
        catchError(handleError)
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
    this.readUsers();

    return this.subject
      .pipe(map((usuarios: User[]) => {
          return usuarios.filter((item: User) => item.user === loginData.user && item.password === loginData.password)[0];
        })
      );
  }

  getSession(){
    return this.sessionSubject.asObservable();
  }

  setSession(user: User) {
    const session: Session = {
      isActive: true,
      user: user
    };

    this.sessionSubject.next(session);
  }

  logout(){
    const session: Session = {
      isActive: false
    };

    this.sessionSubject.next(session);
  }
}
