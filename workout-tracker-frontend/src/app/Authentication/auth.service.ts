import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}
  loginAsGuest() {
    return this.http.post<any>(`${this.apiUrl}/guest-login`, {}).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}
