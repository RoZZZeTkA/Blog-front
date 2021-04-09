import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
  }

  public onAddUser(addUserForm: NgForm): void{
    console.log(addUserForm.value);
    this.userService.addUsers(addUserForm.value).subscribe(
      (data: User) => {
        console.log(data);
      }
    );
  }

}
