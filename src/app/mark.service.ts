import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mark } from './mark';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addMark(formData: FormData, headers): Observable<Mark> {
    return this.http.post<Mark>(`${this.apiServerUrl}/mark/add`, formData, {headers, responseType: 'text' as 'json' });
  }
}
