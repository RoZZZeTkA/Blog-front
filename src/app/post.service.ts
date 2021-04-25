import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPostById(postId: number, headers): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/post/find/${postId}`, {headers, responseType: 'text' as 'json' });
  }

  public getPostsByUserId(userId: number, headers): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiServerUrl}/post/user/${userId}`, {headers, responseType: 'text' as 'json' });
  }

  public getPostsByTag(tag: String, headers): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiServerUrl}/search?t=${tag}`, {headers, responseType: 'text' as 'json' })
  }

  public getPosts(headers): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/post`, {headers, responseType: 'text' as 'json' });
  }

  public addPost(post: Post, tags: String, headers): Observable<Post> {
    return this.http.post<Post>(
      `${this.apiServerUrl}/post/add/${tags}`, post, {headers, responseType: 'text' as 'json' });
  }

  public deletePost(postId: number, headers): Observable<void>{
    return this.http.delete<void>(
      `${this.apiServerUrl}/post/delete/${postId}`, {headers, responseType: 'text' as 'json' });
  }
}
