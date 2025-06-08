import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageApi {
  private baseUrl = environment.apiUrl
  private http = inject(HttpClient);

  getMessages(): Observable<any[]> {
   return this.http.get<any[]>(`${this.baseUrl}/messages`)
  }

  createMessages(message: { to: String, body: String }) {
    return this.http.post(`${this.baseUrl}/messages`, message)
  }
}
