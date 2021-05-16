import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtClientService } from './jwt-client.service';
import { User } from './user';
import { UserService } from './user.service';
import { filter } from 'rxjs/operators';

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
  public showLogin: boolean = false;

  constructor(private router: Router, 
              private userService: UserService,
              private jwtClientService: JwtClientService,
              private elementRef: ElementRef){
                router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data) => this.getCurrentUser());
              }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.margin = '0px';
  }
  

  ngDoCheck(): void {
    if(localStorage.length == 0){
      this.showLogin = true;
    } else {
      this.showLogin = false;
    }
  }

  public onSearch(): void {
    this.router.navigate(['/search'], {queryParams: {t: this.query}});
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public signUp(): void {
    this.router.navigate(['/registration']);
  }

  public logout(): void {
    localStorage.clear();
    this.showProfileButton = false;
    this.router.navigate(['/']);
  }

  public getCurrentUser(): void {
    if(localStorage.length == 0){
      this.showLogin = true;
    } else {
      this.userService.getCurrentUser(this.jwtClientService.getHeaders())
      .subscribe((data: User) => {this.user = JSON.parse(data.toString()); this.showProfileButton = true;})
    }
  }
}
 