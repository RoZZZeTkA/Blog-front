import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../post';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() posts!: Post[];
  public page!: Post[];
  public pages;
  public numberOfPosts: number = 5;
  public currentFirstPost: number = 0;
  public url: String = environment.frontUrl + "/post/";
  public formatDate: string[] = [];
  public formatDatePage: string[] = [];
  public lastSelected;
  public offset = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.page = this.posts.slice(0, this.numberOfPosts);
    if(this.posts.length % this.numberOfPosts == 0)
      this.pages = new Array(this.posts.length / this.numberOfPosts);
    else
      this.pages = new Array(Math.floor(this.posts.length / this.numberOfPosts) + 1);

    if(this.posts.length != 0){
      for(let i = 0; i < this.posts.length; i++){
        let date = new Date(this.posts[i].date);
        let day = date.getDate().toString();
        let month = date.getMonth().toString();
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if(date.getDate() < 10){
          day = "0" + date.getDate();
        }
        if(date.getMonth() < 10){
          month = "0" + (date.getMonth() + 1);
        }
        if(date.getHours() < 10){
          hours = "0" + date.getHours();
        }
        if(date.getMinutes() < 10){
          minutes = "0" + date.getMinutes();
        }
        this.formatDate[i] = (day + "." + month + "." + date.getFullYear() + " " + hours + ":" + minutes);
      }
    }
    this.formatDatePage = this.formatDate.slice(0, this.numberOfPosts);
  }

  ngAfterViewChecked(): void {
    if((<HTMLInputElement>document.getElementById('slider')) != null && this.pages.length < 9)
      (<HTMLInputElement>document.getElementById('slider')).style.width = 40 * this.pages.length + 'px';
    if((<HTMLInputElement>document.getElementById('slider-line')) != null )
      (<HTMLInputElement>document.getElementById('slider-line')).style.width = 40 * this.pages.length + 'px';
    if(this.lastSelected == undefined){
      let tmp = (<HTMLInputElement>document.getElementById('slider-line'));
      if(tmp != null){
        this.lastSelected = tmp.firstChild;
        this.lastSelected.setAttribute('class', 'selected-button');
      }
    }
  }

  public first(): void{
    this.currentFirstPost = 0;
    this.changePage();

    if(this.pages.length > 9){
      this.offset = 0;
      (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px';
    }

    this.lastSelected.setAttribute('class', '');
    this.lastSelected = (<HTMLInputElement>document.getElementById('slider-line')).firstElementChild;
    this.lastSelected.setAttribute('class', 'selected-button');
  }

  public prev(): void{
    if(this.currentFirstPost > 0){
      this.currentFirstPost -= this.numberOfPosts;
      this.changePage();
    }

    if(this.offset < 0 && this.currentFirstPost < 5 * (this.pages.length - 5))
      this.offset += 40;
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px';

    this.lastSelected.setAttribute('class', '');
    if(this.lastSelected.previousElementSibling != null)
      this.lastSelected = this.lastSelected.previousElementSibling;
    this.lastSelected.setAttribute('class', 'selected-button');
  }

  public selectPage(pageNumber: number, event): void{
    this.lastSelected.setAttribute('class', '');
    event.target.setAttribute('class', 'selected-button');
    this.lastSelected = event.target;
    this.currentFirstPost = pageNumber * this.numberOfPosts;
    this.changePage();

    if(this.pages.length > 9){
      if(pageNumber > 3){
        if(pageNumber < this.pages.length - 4){
          this.offset = -40 * (pageNumber - 4);
        } else {
          this.offset = -40 * (this.pages.length - 9);
        }
      } else {
        this.offset = 0;
      }
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px';
    }
  }

  public next(): void{
    if(this.currentFirstPost < this.posts.length - this.numberOfPosts){
      this.currentFirstPost += this.numberOfPosts;
      this.changePage();
    }

    if(this.offset > -40 * (this.pages.length - 9) && this.currentFirstPost > 20){
      this.offset -= 40;
    }
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px';

    this.lastSelected.setAttribute('class', '');
    if(this.lastSelected.nextElementSibling != null)
      this.lastSelected = this.lastSelected.nextElementSibling;
    this.lastSelected.setAttribute('class', 'selected-button');
  }

  public last(): void{
    let rest = this.posts.length % this.numberOfPosts;
    if(rest == 0){
      rest = this.numberOfPosts;
    }
    this.currentFirstPost = this.posts.length - rest;
    this.changePage();

    if(this.pages.length > 9){
    this.offset = -40 * (this.pages.length - 9);
    (<HTMLInputElement>document.getElementById('slider-line')).style.left = this.offset + 'px';
    }

    this.lastSelected.setAttribute('class', '');
    this.lastSelected = (<HTMLInputElement>document.getElementById('slider-line')).lastElementChild;
    this.lastSelected.setAttribute('class', 'selected-button');
  }

  public changePage(): void{
    this.page = this.posts.slice(this.currentFirstPost, this.currentFirstPost + this.numberOfPosts);
    this.formatDatePage = this.formatDate.slice(this.currentFirstPost, this.currentFirstPost + this.numberOfPosts);
  }

}
