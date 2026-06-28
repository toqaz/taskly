import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IuserDataResponse } from '../../models/user/iuser-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly headers = new HttpHeaders({
    apikey: environment.supabase_key,
    'Content-Type': 'application/json',
  });

  private oneMonthExpiry(): number {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.getTime();
  }

  saveToken(token: string, rememberME: boolean): void {
    if (rememberME) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('token_expiry', this.oneMonthExpiry().toString());
    } else {
      sessionStorage.setItem('access_token', token);
    }
  }

  getToken(): string | null {
    return (
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token')
    );
  }

  getUserData(): { name: string; department: string } | null {
    const token = this.getToken();
    if (!token) return null;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    console.log(tokenPayload);
    return {
      name: tokenPayload.user_metadata?.name || '',
      department: tokenPayload.user_metadata?.department || '',
    };
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  sendRegisterData(userData: object): Observable<IuserDataResponse> {
    return this.httpClient.post<IuserDataResponse>(
      environment.base_url + '/auth/v1/signup',
      userData,
      {
        headers: this.headers,
      },
    );
  }
  sendLoginData(userData: object): Observable<IuserDataResponse> {
    return this.httpClient.post<IuserDataResponse>(
      environment.base_url + '/auth/v1/token?grant_type=password',
      userData,
      {
        headers: this.headers,
      },
    );
  }

  userLogOut(): Observable<any> {
    const token = this.getToken();
    const logoutHeaders = new HttpHeaders({
      'apikey': environment.supabase_key,
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json',
    })

    return this.httpClient.post(
    environment.base_url + '/auth/v1/logout',
    {},
    { headers: logoutHeaders }
  );
  }

  clearToken():void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiry');
    sessionStorage.removeItem('access_token');
    document.cookie = 'access_token=; Max-Age=0';
    document.cookie = 'refresh_token=; Max-Age=0';
  }
}
