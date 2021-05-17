import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-searh-results',
  templateUrl: './searh-results.component.html',
  styleUrls: ['./searh-results.component.css']
})
export class SearhResultsComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private postService: PostService, 
              private router: Router,
              private jwtClientService: JwtClientService,
              private elementRef: ElementRef) {
                router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data) => this.getPostsByTag());
              }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }

  public getPostsByTag(): void{
    this.postService.getPostsByTag(this.router.url.substring(10, this.router.url.length), this.jwtClientService.getHeaders())
    .subscribe(data => this.posts = JSON.parse(data.toString()))
  }

}
