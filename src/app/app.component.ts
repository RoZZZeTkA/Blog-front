import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  public query: string = "";
  public homeUrl: String = environment.frontUrl + "/";

  constructor(private router: Router){}

  ngOnInit(): void {
    console.log(this.homeUrl);
  }

  public onSearch(): void{
    this.router.navigate(['/search'], {queryParams: {t: this.query}});
  }
}
 