import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public post!: Post;
  public posts!: Post[];

  constructor(private postService: PostService, private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(): void {
    this.postService.getPosts(this.jwtClientService.getHeaders()).subscribe((data: Post[]) => {this.posts = JSON.parse(data.toString());},
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }

  public onAddPost(addPostForm: NgForm): void{
    this.postService.addPost(addPostForm.value, this.jwtClientService.getHeaders()).subscribe(
      (data: Post) => {
        this.getPosts();
      }
    )
  }

}
