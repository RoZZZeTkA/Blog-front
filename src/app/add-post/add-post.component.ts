import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public post!: Post;
  public posts!: Post[];
  public files!: FileList;

  constructor(private postService: PostService, private storageService: StorageService, private jwtClientService: JwtClientService) { }

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
    if(this.files != undefined){
      for(let i = 0; i < this.files.length; i++){
        console.log(this.files[i].name);
        let formData = new FormData();
        formData.append('file', this.files[i], this.files[i].name);
        formData.append('title', (<HTMLInputElement>document.getElementById('title')).value);
        this.storageService.uploadFile(formData, this.jwtClientService.getHeaders()).subscribe(
          (data: String) => {console.log(data);}
        )
      }
    }
  }

  public onAddFiles(event) {
    this.files = event.target.files;
  }
}
