import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post!: Post;
  public posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(): void {
    this.postService.getPosts().subscribe((response: Post[]) => {this.posts = response;},
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }

  public onAddPost(addPostForm: NgForm): void{
    this.postService.addPost(addPostForm.value).subscribe(
      (response: Post) => {
        console.log(response);
        this.getPosts();
      }
    )
  }

}
