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

  public password: string = "";
  public repeatPassword: string = "";

  constructor(private userService: UserService, 
              private jwtClientService: JwtClientService, 
              private router: Router,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
  }

  public onAddUser(addUserForm: NgForm): void{
    console.log(addUserForm.value);
    this.userService.addUsers(addUserForm.value).subscribe(
      (data: User) => {
        console.log(data);
        alert("Check your email");
      },
      (error) => {
        alert("Error");
      }
    );
  }

  public repeatPasswordChange(): void{
    if(this.password === this.repeatPassword){
     (<HTMLInputElement>document.getElementById('repeatPassword')).style.borderLeft = "5px solid #42A948";
    } else {
      (<HTMLInputElement>document.getElementById('repeatPassword')).style.borderLeft = "5px solid #A94442";
    }
  }

}
