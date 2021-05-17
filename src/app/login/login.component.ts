import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { User } from '../user';
import { AuthRequest } from '../authRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private jwtClientService: JwtClientService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
  }

  public loginUser(loginUserForm: NgForm): void{
    this.jwtClientService.getAccessToken(loginUserForm.value)
  }
}
