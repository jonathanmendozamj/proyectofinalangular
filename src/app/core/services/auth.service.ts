import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Session } from '../models/session';
import data from './../../../assets/users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersObservable!: Observable<any>;
  private loginObservable!: Observable<any>;

  private sessionSubject!: BehaviorSubject<Session>;

  constructor() { 
    this.usersObservable = new Observable<any>((subscriber) => {
      let users = data;

      subscriber.next(users);

      subscriber.complete();

      if(!Array.isArray(users)) {
        subscriber.error({
          code: -1,
          message: 'No es un array.'
        });
      }

      if(users.length === 0){
        subscriber.error({
          code: -1,
          message: 'No hay usuarios disponibles.'
        });
      }
    });

    const session: Session = {
      isActive: false
    };
    this.sessionSubject = new BehaviorSubject(session);
  }

  getAllUsers() {
    return this.usersObservable;
  }

  login(loginData: User) {
    this.loginObservable = new Observable<any>((subscriber) => {
      let loginUser = data.find(item => item.user === loginData.user && item.password === loginData.password);

      if(loginUser) {
        subscriber.next(loginUser);

        const session: Session = {
          isActive: true,
          user: loginUser
        };
    
        this.sessionSubject.next(session);

        subscriber.complete();
      } else {
        subscriber.error({
          code: -1,
          message: 'No puede loguearse.'
        });
      }
    });

    return this.loginObservable;
  }

  getSession(){
    return this.sessionSubject.asObservable();
  }

  logout(){
    const session: Session = {
      isActive: false
    };
    this.sessionSubject.next(session);
  }
}
