import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(){}

  ngOnInit(): void {
    //this.getPostById(postId);
  }

  // public getPostById(postId: number): void {
  //   this.postService.getPostById(postId).subscribe((response: Post) => {this.post = response},
  //     (error: HttpErrorResponse) => {alert(error.message);}
  //   );
  // }
}
 