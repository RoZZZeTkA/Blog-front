import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {

  public email: string = "";
  public emailValid: boolean = false;

  constructor(private userService: UserService,
              private jwtClientService: JwtClientService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
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
  }

  public sendResetRequest(): void {
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('path', window.location.protocol + "//" + window.location.host);
    this.userService.sendResetRequest(formData, this.jwtClientService.getHeaders()).subscribe(
      (data: String) => {console.log(data);}
    )
  }
}
