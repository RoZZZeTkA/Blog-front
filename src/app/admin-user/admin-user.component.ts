import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  public user: User = {} as User;
  public id!: number;
  public posts: Post[] = [];
  private subscription: Subscription;
  public url: String = environment.frontUrl + "/post/";
  public urlDelete: String = environment.apiBaseUrl + "/post/delete/";

  constructor(private userService: UserService, 
    private postService: PostService,
    private jwtClientService: JwtClientService,
    private activateRoute: ActivatedRoute) {
      this.subscription = activateRoute.params.subscribe(data => this.id = data['id'])
     }
  ngOnInit(): void {
    this.getUserById();
    this.getPostsByUserId();
  }

  public getUserById(): void {
    this.userService.getUserById(this.id, this.jwtClientService.getHeaders())
    .subscribe((data: User) => {this.user = JSON.parse(data.toString());})
  }

  public getPostsByUserId(): void{
    this.postService.getPostsByUserId(this.id, this.jwtClientService.getHeaders())
    .subscribe((data: Post[]) => {this.posts = JSON.parse(data.toString());})
  }

  public onDeletePost(postId: number): void{
    this.postService.deletePost(postId, this.jwtClientService.getHeaders())
    .subscribe((data: void) => {this.getPostsByUserId();},
    (error: HttpErrorResponse) => {
      alert("You don't have enough rights ");
    })
  }

}
