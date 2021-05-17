import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, NgModel, Validators } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public files!: FileList;

  constructor(private postService: PostService, 
              private storageService: StorageService, 
              private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
  }

  public onAddPost(addPostForm: NgForm): void{
    this.postService.addPost(addPostForm.value, (<HTMLInputElement>document.getElementById('tags')).value, this.jwtClientService.getHeaders()).subscribe(
      () => {
        let title = (<HTMLInputElement>document.getElementById('title')).value;
        
        if(this.files != undefined){
          
          for(let i = 0; i < this.files.length; i++){
            let formData = new FormData();
            formData.append('file', this.files[i], this.files[i].name);
            formData.append('title', title);
            this.storageService.uploadFile(formData, this.jwtClientService.getHeaders()).subscribe(
              (data: String) => {console.log(data);}
            )
          }
        }
        addPostForm.reset();
        (<HTMLInputElement>document.getElementById('tags')).value = "";
        (<HTMLInputElement>document.getElementById('files')).value = "";
      },
      (error: HttpErrorResponse) => {
        alert("Failed to add post");
      }
    );
  }

  public onAddFiles(event) {
    this.files = event.target.files;
  }
}
