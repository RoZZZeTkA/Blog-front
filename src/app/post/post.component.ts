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
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post!: Post;
  public user!: User;
  public urls;
  public id!: number;
  private subscription: Subscription;
  public userUrl: String = environment.frontUrl + "/user/";
  public searchUrl: String = environment.frontUrl + "/search?t=";
  public showOverlay: boolean = false;
  public showSlider: boolean = false;
  public openImageSrc;
  public offset = 0;


  constructor(private postService: PostService,
              private storageService: StorageService,
              private userService: UserService,
              private jwtClientService: JwtClientService,
              private activateRoute: ActivatedRoute) {
                this.subscription = activateRoute.params.subscribe(data => this.id = data['id'])
               }

  ngOnInit(): void {
    this.getPostById();
  }

  public getPostById(): void {
    this.postService.getPostById(this.id, this.jwtClientService.getHeaders())
    .subscribe((data: string) => {this.post = JSON.parse(data); 
                                  this.userService.getUserById(this.post.userId, this.jwtClientService.getHeaders())
                                  .subscribe((data: User) => this.user = JSON.parse(data.toString()));})

    this.storageService.getUrlsByPostId(this.id, this.jwtClientService.getHeaders())
    .subscribe((data) => {this.urls = JSON.parse(data.toString());
                                      if(this.urls.length != 0){ 
                                        this.showSlider = true;
                                        (<HTMLInputElement>document.getElementById('slider-line')).style.width = 1170 * this.urls.length + 'px';
                                      }
                                    })
  }

  public prev(): void{
    this.offset += 1170;
    if(this.offset > 0)
      this.offset = -1170 * (this.urls.length - 1);
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px'
  }

  public next(): void{
    this.offset -= 1170;
    if(this.offset < -1170 * (this.urls.length - 1)){
      this.offset = 0;
    }
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px'
  }

  public openImage(url): void{
    console.log(url);
    this.showOverlay = true;
    this.openImageSrc = url;
  }

  public hideOverlay(): void{
    this.showOverlay = false;
  }
}
