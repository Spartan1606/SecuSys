import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { construct } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'http://127.0.0.1:8000';
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {

    return this.http.post(`${this.baseURL}/users/register`, userData);

  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return this.http.post(
      `${this.baseURL}/users/login`,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.access_token);
      })
    );
  }


  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    if (!token || token === 'undefined' || token.trim() === '') {
      localStorage.removeItem(this.tokenKey);
      return null;
    }

    return token;
  }

  private decodeToken(token: string): any | null {

    try {

      const payload = token.split('.')[1];
      const decoded = atob(payload)
      return JSON.parse(decoded)

    } catch (error) {

      console.error('[AuthService] invalid token format', error);

      return null;

    }

  }

  isTokenExpired(token: string): boolean {

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp){

      return true;

    }

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;

  }
  
  getUserRole(): string | null {

    const token = this.getToken();
    if (!token) return null;

    try{

      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;

    } catch (error) {

      console.error('[AuthService] Failed to decode role: ', error);
      return null;

    }

  }

  logout(): void {

    localStorage.removeItem(this.tokenKey);

  }

  getProfile(): Observable<any> {

    return this.http.get(`${this.baseURL}/users/me`);

  }

}

