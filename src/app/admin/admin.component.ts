import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtClientService } from '../jwt-client.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users!: User[];
  public url: String = environment.frontUrl + "/user/";

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
