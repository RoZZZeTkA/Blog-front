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
  public page;
  public numberOfElements: number = 3;
  public currentFirstElement: number = 0;
  public showOverlay: boolean = false;
  public openImageSrc;


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
    .subscribe((data) => {this.urls = JSON.parse(data.toString()); this.page = this.urls.slice(0, this.numberOfElements);})
  }

  public prev(): void{
    if(this.currentFirstElement > 0){
      this.currentFirstElement -= this.numberOfElements;
      this.changePage();
    }
  }

  public next(): void{
    if(this.currentFirstElement < this.urls.length - this.numberOfElements){
      this.currentFirstElement += this.numberOfElements;
      this.changePage();
    }
  }

  public changePage(): void{
    this.page = this.urls.slice(this.currentFirstElement, this.currentFirstElement + this.numberOfElements);
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
