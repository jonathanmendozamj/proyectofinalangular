import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  postsPromise: any;
  postsSubscription!: Subscription;

  constructor(private postsService: PostsService) { }

  callSubscription(valueSeached: string = ''){
    this.postsSubscription = this.postsService.getPostsObservable()
      .pipe(
        map((posts: any[]) => posts.filter(post => post.title.includes(valueSeached)))
      )
      .subscribe((posts) => {
        console.log(posts);
        this.posts = posts;
      });
  }

  ngOnInit(): void {

    this.callSubscription();
    
    this.postsService.getPostsPromise()
      .then((posts) => {
        console.log(posts);
        this.postsPromise = posts;
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => {
        console.log('Finalizo la promesa');
      });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  filter(event: Event) {
    console.log(event);
    let obtainedValue = (event.target as HTMLInputElement).value;
    obtainedValue = obtainedValue.trim().toLocaleLowerCase();
    console.log(obtainedValue);

    this.callSubscription(obtainedValue);
  } 

}
