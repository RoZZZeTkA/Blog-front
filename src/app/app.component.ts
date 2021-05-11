import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtClientService } from './jwt-client.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  public query: string = "";
  public homeUrl: String = environment.frontUrl + "/";
  public userUrl: String = environment.frontUrl + "/user/";
  public user: User = {} as User;
  public showProfileButton: boolean = false;

  constructor(private router: Router, 
              private userService: UserService,
              private jwtClientService: JwtClientService){}

  ngOnInit(): void {
    this.userService.getCurrentUser(this.jwtClientService.getHeaders())
    .subscribe((data: User) => {this.user = JSON.parse(data.toString()); console.log(this.user)})
  }

  public onSearch(): void{
    this.router.navigate(['/search'], {queryParams: {t: this.query}});
  }
}
 