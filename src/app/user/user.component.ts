import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users!: User[];

  constructor(private userService: UserService, private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers(this.jwtClientService.getHeaders()).subscribe((data: User[]) => {this.users = JSON.parse(data.toString());},
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }

}
