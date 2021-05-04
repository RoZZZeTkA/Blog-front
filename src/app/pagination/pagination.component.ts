import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../post';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() posts!: Post[];
  public page!: Post[];
  public pages;
  public numberOfPosts: number = 5;
  public currentFirstPost: number = 0;
  public url: String = environment.frontUrl + "/post/";
  public formatDate: string[] = [];
  public lastSelected;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.page = this.posts.slice(0, this.numberOfPosts);
    if(this.posts.length % this.numberOfPosts == 0)
      this.pages = new Array(this.posts.length / this.numberOfPosts);
    else
      this.pages = new Array(Math.floor(this.posts.length / this.numberOfPosts) + 1);

    if(this.posts.length != 0){
      for(let i = 0; i < this.posts.length; i++){
        let date = new Date(this.posts[i].date);
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
        this.formatDate[i] = (day + "." + month + "." + date.getFullYear() + " " + hours + ":" + minutes);
      }
    }
    this.lastSelected = (<HTMLInputElement>document.getElementsByTagName('button')[2]);
    //this.lastSelected.setAttribute('class', 'selected-button');
  }

  public first(): void{
    this.currentFirstPost = 0;
    this.changePage();
  }

  public prev(): void{
    if(this.currentFirstPost > 0){
      this.currentFirstPost -= this.numberOfPosts;
      this.changePage();
    }
  }

  public selectPage(pageNumber: number, event): void{
    console.log(this.lastSelected);
    this.lastSelected.setAttribute('class', '');
    event.target.setAttribute('class', 'selected-button');
    this.lastSelected = event.target;
    this.currentFirstPost = pageNumber * this.numberOfPosts;
    this.changePage();
  }

  public next(): void{
    if(this.currentFirstPost < this.posts.length - this.numberOfPosts){
      this.currentFirstPost += this.numberOfPosts;
      console.log("next: " + this.currentFirstPost);
      this.changePage();
    }
  }

  public last(): void{
    let rest = this.posts.length % this.numberOfPosts;
    if(rest == 0){
      rest = this.numberOfPosts;
    }
    this.currentFirstPost = this.posts.length - rest;
    this.changePage();
  }

  public changePage(): void{
    this.page = this.posts.slice(this.currentFirstPost, this.currentFirstPost + this.numberOfPosts);
  }

}
