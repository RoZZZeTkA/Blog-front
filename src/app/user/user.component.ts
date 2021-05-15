import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User = {} as User;
  public id!: number;
  public posts: Post[] = [];
  private subscription: Subscription;
  public showAddPostButton: boolean = false;

  constructor(private userService: UserService, 
              private postService: PostService,
              private jwtClientService: JwtClientService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
              this.subscription = activateRoute.params.subscribe(data => this.id = data['id']);
  }

  ngOnInit(): void {
    this.getUserById();
    this.getPostsByUserId();
    if(localStorage.length != 0){
      this.userService.getCurrentUser(this.jwtClientService.getHeaders())
      .subscribe((data: User) => {data = JSON.parse(data.toString());
                                  if(data.nickname === this.user.nickname){ 
                                    this.showAddPostButton = true;
                                  }
      })
    }
  }

  public getUserById(): void {
    this.userService.getUserById(this.id, this.jwtClientService.getHeaders())
    .subscribe((data: User) => {this.user = JSON.parse(data.toString());})
  }

  public getPostsByUserId(): void {
    this.postService.getPostsByUserId(this.id, this.jwtClientService.getHeaders())
    .subscribe((data: Post[]) => {this.posts = JSON.parse(data.toString());})
  }

  public onAddPost(): void {
    this.router.navigate(['/post-add']);
  }
}
