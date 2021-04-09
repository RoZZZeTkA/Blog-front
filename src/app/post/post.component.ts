import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post!: Post;
  public id!: number;
  private subscription: Subscription;

  constructor(private postService: PostService, 
              private jwtClientService: JwtClientService,
              private activateRoute: ActivatedRoute) {
                this.subscription = activateRoute.params.subscribe(data => this.id = data['id'])
               }

  ngOnInit(): void {
    this.getPostById();
  }

  public getPostById(): void {
    this.postService.getPostById(this.id, this.jwtClientService.getHeaders()).subscribe((data: string) => {this.post = JSON.parse(data);})
  }
}
