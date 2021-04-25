import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post!: Post;
  public urls;
  public id!: number;
  private subscription: Subscription;
  public userUrl: String = environment.frontUrl + "/user/";
  public searchUrl: String = environment.frontUrl + "/search?t=";


  constructor(private postService: PostService,
              private storageService: StorageService,
              private jwtClientService: JwtClientService,
              private activateRoute: ActivatedRoute) {
                this.subscription = activateRoute.params.subscribe(data => this.id = data['id'])
               }

  ngOnInit(): void {
    this.getPostById();
  }

  public getPostById(): void {
    this.postService.getPostById(this.id, this.jwtClientService.getHeaders())
    .subscribe((data: string) => {this.post = JSON.parse(data); console.log(this.post);})
    this.storageService.getUrlsByPostId(this.id, this.jwtClientService.getHeaders())
    .subscribe((data) => {this.urls = JSON.parse(data.toString());})
  }

  // public tagOnClick(): void{
  //   this.router.navigate(['/search'], {queryParams: {t: 'qqq'}});
  // }
}
