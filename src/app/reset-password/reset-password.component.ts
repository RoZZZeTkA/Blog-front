import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtClientService } from '../jwt-client.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public password: string = "";
  public isPasswordStrong: boolean = false;
  private subscription: Subscription;
  private resetCode: string = "";

  constructor(private jwtClientService: JwtClientService,
              private elementRef: ElementRef,
              private activateRoute: ActivatedRoute,
              private userService: UserService) { 
                this.subscription = activateRoute.params.subscribe(data => this.resetCode = data['resetCode']);
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
  }

  public passwordValidation(): void {
    let regEx = new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,256}");
    this.isPasswordStrong = regEx.test(this.password);
    if(this.isPasswordStrong)
      (<HTMLInputElement>document.getElementById('password')).style.borderLeft = "5px solid #42A948";
    else
      (<HTMLInputElement>document.getElementById('password')).style.borderLeft = "5px solid #A94442";
  }

  public resetPassword(): void {
    let formData = new FormData();
    formData.append('resetCode', this.resetCode);
    formData.append('newPassword', this.password);
    this.userService.resetPassword(formData, this.jwtClientService.getHeaders()).subscribe(
      (data: String) => {console.log(data);}
    )
  }
}
