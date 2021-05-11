import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(headers): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user`, {headers, responseType: 'text' as 'json' });
  }

  public getUserById(userId: number, headers): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${userId}`, {headers, responseType: 'text' as 'json' });
  }

  public getCurrentUser(headers): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/current`, {headers, responseType: 'text' as 'json' });
  }

  public addUsers(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUsers(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUsers(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }
}
