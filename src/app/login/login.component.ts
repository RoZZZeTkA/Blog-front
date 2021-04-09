import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { LoginService } from '../login.service';
import { User } from '../user';
import { AuthRequest } from '../authRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
  }

  public loginUser(loginUserForm: NgForm): void{
    this.jwtClientService.getAccessToken(loginUserForm.value)
  }
}
