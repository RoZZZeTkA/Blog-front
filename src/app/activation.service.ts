import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public activation(activationCode: String): Observable<String> {
    return this.http.get<String>(`${this.apiServerUrl}/user/activation/${activationCode}`);
  }
}
