import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public posts!: Post[];
  public page!: Post[];
  public numberOfPosts: number = 5;
  public currentFirstPost: number = 0;
  public url: String = environment.frontUrl + "/post/";

  constructor(private postService: PostService,
              private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(): void {
    this.postService.getPosts(this.jwtClientService.getHeaders())
    .subscribe((data: Post[]) => {this.posts = JSON.parse(data.toString()); this.page = this.posts.slice(0, this.numberOfPosts);})
  }

  public prev(): void{
    if(this.currentFirstPost > 0){
      this.currentFirstPost -= this.numberOfPosts;
      this.changePage();
    }
  }

  public next(): void{
    if(this.currentFirstPost < this.posts.length - this.numberOfPosts){
      this.currentFirstPost += this.numberOfPosts;
      this.changePage();
    }
  }

  public changePage(): void{
    this.page = this.posts.slice(this.currentFirstPost, this.currentFirstPost + this.numberOfPosts);
  }
}
