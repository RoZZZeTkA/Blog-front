import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtClientService } from '../jwt-client.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public nickname: string = "";
  public email: string = "";
  public password: string = "";
  public repeatPassword: string = "";
  public nicknameValid: boolean = false;
  public emailValid: boolean = false;
  public passwordValid: boolean = false;
  public formValid: boolean = false;
  public isPasswordStrong: boolean = false;

  constructor(private userService: UserService, 
              private jwtClientService: JwtClientService, 
              private router: Router,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
  }

  public onAddUser(addUserForm: NgForm): void {
    console.log(addUserForm.value);
    this.userService.addUsers(addUserForm.value).subscribe(
      (data: User) => {
        console.log(data);
        alert("Check your email");
      },
      (error) => {
        alert("Error: " + error.message);
      }
    );
  }

  public nicknameValidation(): void {
    if(this.nickname.length > 0){
      this.nicknameValid = true;
      (<HTMLInputElement>document.getElementById('nickname')).style.borderLeft = "5px solid #42A948";
    }
    else{
      this.nicknameValid = false;
      (<HTMLInputElement>document.getElementById('nickname')).style.borderLeft = "5px solid #A94442";
    }
    this.formValid = this.nicknameValid && this.emailValid && this.passwordValid;
  }

  public emailValidation(): void {
    let regEx = new RegExp("^([a-zA-Z0-9])+@([a-z])+\\.([a-z])+$");
    if(regEx.test(this.email)){
      this.emailValid = true;
      (<HTMLInputElement>document.getElementById('email')).style.borderLeft = "5px solid #42A948";
    }
    else{
      this.emailValid = false;
      (<HTMLInputElement>document.getElementById('email')).style.borderLeft = "5px solid #A94442";
    }
    this.formValid = this.nicknameValid && this.emailValid && this.passwordValid;
  }

  public passwordValidation(): void {
    let regEx = new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,256}");
    this.isPasswordStrong = regEx.test(this.password);
    let isPasswordsEquals = this.password === this.repeatPassword;
    if(this.isPasswordStrong)
      (<HTMLInputElement>document.getElementById('password')).style.borderLeft = "5px solid #42A948";
    else
      (<HTMLInputElement>document.getElementById('password')).style.borderLeft = "5px solid #A94442";
    if(isPasswordsEquals)
      (<HTMLInputElement>document.getElementById('repeatPassword')).style.borderLeft = "5px solid #42A948";
    else 
      (<HTMLInputElement>document.getElementById('repeatPassword')).style.borderLeft = "5px solid #A94442";
    if(this.isPasswordStrong && isPasswordsEquals)
      this.passwordValid = true;
    else
      this.passwordValid = false;
    this.formValid = this.nicknameValid && this.emailValid && this.passwordValid;
  }
}
