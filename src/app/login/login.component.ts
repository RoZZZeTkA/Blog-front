import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //user = new User();
  public user = {} as User;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.loginService.loginUserFromRemote(this.user).subscribe(
      data => console.log("response recieved"),
      error => console.log("exception occured")
      
    )
  }
}
