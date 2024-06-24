import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iposts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postUrl = `${environment.baseUrl}/posts`;
  private newPostSub$: Subject<Iposts> = new Subject<Iposts>();
  private updatePostSub$: Subject<Iposts> = new Subject<Iposts>();
  newPostSubObs$: Observable<Iposts> = this.newPostSub$.asObservable();
  updatePostSubObs$: Observable<Iposts> = this.updatePostSub$.asObservable();

  constructor(private _http: HttpClient) { }

  getAllPosts(): Observable<Array<Iposts>> {
    return this._http.get(this.postUrl)
      .pipe(
        map((res: any) => {
          let posts: Array<Iposts> = [];
          console.log(res);
          for (const key in res) {
            posts.unshift({ ...res[key], id: key })
          };
          return posts
        })
      )
  }

  createPost(post: Iposts): Observable<any> {
    return this._http.post<any>(this.postUrl, post)
      .pipe(
        catchError(err => {
          alert(`something went wrong`)
          return of(err)
        })
      )
  }

  sendNewPost(post: Iposts) {
    this.newPostSub$.next(post)
  }

  sendUpdatedPost(post: Iposts) {
    this.updatePostSub$.next(post)
  }

  updatePost(post: Iposts): Observable<any> {
    let updateUrl = `${environment.baseUrl}/posts/${post.id}`;
    return this._http.patch(updateUrl, post)
  }

  removePost(id: string): Observable<any> {
    let removeUrl = `${environment.baseUrl}/posts/${id}`;
    return this._http.delete(removeUrl)
  }

}
