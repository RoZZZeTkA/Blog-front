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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.page = this.posts.slice(0, this.numberOfPosts);
    if(this.posts.length % this.numberOfPosts == 0)
      this.pages = new Array(this.posts.length / this.numberOfPosts);
    else
      this.pages = new Array(Math.floor(this.posts.length / this.numberOfPosts) + 1);
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

  public selectPage(pageNumber: number): void{
    this.currentFirstPost = pageNumber * this.numberOfPosts;
    this.changePage();
  }

  public next(): void{
    if(this.currentFirstPost < this.posts.length - this.numberOfPosts){
      this.currentFirstPost += this.numberOfPosts;
      this.changePage();
    }
  }

  public last(): void{
    this.currentFirstPost = this.posts.length - this.posts.length % this.numberOfPosts;
    this.changePage();
  }

  public changePage(): void{
    this.page = this.posts.slice(this.currentFirstPost, this.currentFirstPost + this.numberOfPosts);
  }

}
