import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageApi {
  private baseUrl = "http://localhost:3000/"
  private http = inject(HttpClient);

  getMessages(): Observable<any[]> {
   return this.http.get<any[]>(`${this.baseUrl}/messages`)
  }

  createMessages(message: { to: String, body: String }) {
    return this.http.post(`${this.baseUrl}/messages`, message)
  }
}
