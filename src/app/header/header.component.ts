import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public query: string = "";

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  public onSearch(): void{
    this.router.navigate(['/search'], {queryParams: {t: this.query}});
  }

}
