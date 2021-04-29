import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-searh-results',
  templateUrl: './searh-results.component.html',
  styleUrls: ['./searh-results.component.css']
})
export class SearhResultsComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private postService: PostService, 
              private router: Router,
              private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
    this.getPostsByTag();
  }

  public getPostsByTag(): void{
    this.postService.getPostsByTag(this.router.url.substring(10, this.router.url.length), this.jwtClientService.getHeaders())
    .subscribe(data => {this.posts = JSON.parse(data.toString());})
  }

}
