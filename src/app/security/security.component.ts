import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthRequest } from '../authRequest';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  resp: any;

  constructor(private jwtClientService: JwtClientService) { }

  ngOnInit(): void {
    //this.accessApi();
  }

  public accessApi(){
    let response = this.jwtClientService.welcome(this.jwtClientService.getHeaders());
    response.subscribe(data => this.resp = data);
  }
}
