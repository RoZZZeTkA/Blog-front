import { Component, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private postService: PostService,
              private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(): void {
    this.postService.getPosts(this.jwtClientService.getHeaders())
    .subscribe((data: Post[]) => {this.posts = JSON.parse(data.toString());})
  }
}
