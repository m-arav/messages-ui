// src/app/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/users/sign_in`, { user: { email, password } }, { observe: 'response' })
      .pipe(tap(res => {
        const jwt = res.headers.get('Authorization');
        if (jwt) {
          localStorage.setItem('token', jwt);
          this.token.set(jwt);
        }
      }));
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/users`, {
      user: { email, password }
    });
  }

  logout() {
    const token = this.token();
    if (!token) return;
    const headers = new HttpHeaders({ Authorization: token });
    return this.http.delete(`${this.baseUrl}/users/sign_out`, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.token.set(null);
      })
    );
  }

  isAuthenticated() {
    return !!this.token();
  }
}
