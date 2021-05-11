import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { MarkService } from '../mark.service';
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

  public post: Post = {} as Post;
  public user: User = {} as User;
  public urls;
  public id: number = 0;
  private subscription: Subscription;
  public userUrl: String = environment.frontUrl + "/user/";
  public searchUrl: String = environment.frontUrl + "/search?t=";
  public showOverlay: boolean = false;
  public showSlider: boolean = false;
  public openImageSrc;
  public offset = 0;
  public formatDate: string = "";
  public splitValue: string[] = [];
  public rating: number = 0;
  public imageWidth: number = 1170;


  constructor(private postService: PostService,
              private storageService: StorageService,
              private userService: UserService,
              private markService: MarkService,
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
                                  .subscribe((data: User) => this.user = JSON.parse(data.toString()));
                                  let date = new Date(this.post.date);
                                  let day = date.getDate().toString();
                                  let month = date.getMonth().toString();
                                  let hours = date.getHours().toString();
                                  let minutes = date.getMinutes().toString();
                                  if(date.getDate() < 10){
                                    day = "0" + date.getDate();
                                  }
                                  if(date.getMonth() < 10){
                                    month = "0" + (date.getMonth() + 1);
                                  }
                                  if(date.getHours() < 10){
                                    hours = "0" + date.getHours();
                                  }
                                  if(date.getMinutes() < 10){
                                    minutes = "0" + date.getMinutes();
                                  }
                                  this.formatDate += (day + "." + month + "." + date.getFullYear() + " " + hours + ":" + minutes);
                                  for(let i = 0; i < this.post.value.split("\n").length; i++){
                                    this.splitValue[i] = this.post.value.split("\n")[i];
                                  }
                                  for(let i = 0; i < this.post.postMarks.length; i++){
                                    this.rating += this.post.postMarks[i].value;
                                  }
                                  (<HTMLInputElement>document.getElementById('slider-line')).style.width = this.imageWidth * this.urls.length + 'px';
                                })

    this.storageService.getUrlsByPostId(this.id, this.jwtClientService.getHeaders())
    .subscribe((data) => {this.urls = JSON.parse(data.toString());
                                      if(this.urls.length != 0){ 
                                        this.showSlider = true;
                                        // (<HTMLInputElement>document.getElementById('slider-line')).style.width = this.imageWidth * this.urls.length + 'px';
                                      }
                                    })
  }

  public prev(): void{
    this.offset += this.imageWidth;
    if(this.offset > 0)
      this.offset = -this.imageWidth * (this.urls.length - 1);
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px'
  }

  public next(): void{
    this.offset -= this.imageWidth;
    if(this.offset < -this.imageWidth * (this.urls.length - 1)){
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

  public onAddMark(markValue: number): void{
    let formData = new FormData();
    formData.append('postId', this.id.toString());
    formData.append('value', markValue.toString());
    this.markService.addMark(formData,  this.jwtClientService.getHeaders()).subscribe(
      (data) => {console.log(data);}
    )
  }
}
