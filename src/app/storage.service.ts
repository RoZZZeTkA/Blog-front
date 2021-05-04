import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData, headers): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/file/upload`, formData, {headers, responseType: 'text' as 'json' });
  }

  public getUrlsByPostId(postId: number, headers): Observable<String[]>{
    return this.http.get<String[]>(`${this.apiServerUrl}/file/post/${postId}`, {headers, responseType: 'text' as 'json' });
  }
}
