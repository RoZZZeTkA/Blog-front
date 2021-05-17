import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from './authRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, 
              private router: Router) { }

  public generateToken(request){
    console.log(this.apiServerUrl);
    let token = this.http.post(`${this.apiServerUrl}/auth`, request, {responseType: 'text' as 'json'});
    return token;
  }

  public getAccessToken(authRequest: AuthRequest){
    let response = this.generateToken(authRequest);
    response.subscribe(data => {localStorage.setItem("token", "Bearer " + data);
                                this.router.navigate(["/"]);
                              });
  }  
  
  public getHeaders(){
      return new HttpHeaders().set("Authorization", localStorage.getItem("token") || "{}");
  }

  public welcome(headers){
    return this.http.get(`${this.apiServerUrl}`, {headers, responseType: 'text' as 'json' });
  }
}
