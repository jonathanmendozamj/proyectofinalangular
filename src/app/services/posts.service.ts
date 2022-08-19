import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  getPostsPromise() {

    return new Promise((resolve, reject) => {
      fetch(URL)
      .then(response => response.json())
      .then(posts => {
        if(Array.isArray(posts)){
          if(posts.length > 0){
            resolve(posts);
          } else {
            reject({
              codigo: -1,
              mensaje: 'No hay posts disponibles.'
            });
          }
        } else {
          reject({
            codigo: -2,
            mensaje: 'No es un array.'
          });
        }
        
      })
      .catch(error => reject(error));
    });

  }

  getPostsObservable() : Observable<any[]> {
    return this.http.get<any[]>(URL);
  }
}
