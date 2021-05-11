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
    let tags = (<HTMLInputElement>document.getElementById('tags')).value;
    this.postService.addPost(addPostForm.value, tags, this.jwtClientService.getHeaders()).subscribe(
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

        // let tags = (<HTMLInputElement>document.getElementById('tags')).value.split(", ");
        // if(!(tags[0] == "")){
        //   for(let i = 0; i < tags.length; i++){
        //     console.log(tags[i]);
        //     let formData = new FormData();
        //     formData.append('tag', tags[i]);
        //     formData.append('title', title);
        //     this.tagService.addTag(formData, this.jwtClientService.getHeaders()).subscribe(
        //       (data: Tag) => {console.log(data);}
        //     )
        //   }
        // }
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
