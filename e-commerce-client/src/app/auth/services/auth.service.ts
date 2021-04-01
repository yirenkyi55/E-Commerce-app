import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthUserRequestResponse,
  CreateAccountRequestModel,
  LoginRequestModel,
} from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  loginService(
    loginRequest: LoginRequestModel
  ): Observable<AuthUserRequestResponse> {
    return this.http.post<AuthUserRequestResponse>(
      `${this.baseUrl}/login`,
      loginRequest,
      {
        withCredentials: true,
      }
    );
  }

  createAccount(
    accountRequest: CreateAccountRequestModel
  ): Observable<AuthUserRequestResponse> {
    return this.http.post<AuthUserRequestResponse>(
      `${this.baseUrl}/account`,
      accountRequest,
      {
        withCredentials: true,
      }
    );
  }

  refreshToken(model: { token: string }): Observable<AuthUserRequestResponse> {
    return this.http.post<AuthUserRequestResponse>(
      `${this.baseUrl}/refresh`,
      model,
      {
        withCredentials: true,
      }
    );
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('authState'))?.auth?.currentUser
      ?.accessToken;
  }

  checkEmailExistence(email: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<boolean>(`${this.baseUrl}/emailExists`, {
      params,
    });
  }

  logOut(): void {
    localStorage.removeItem('authState');
  }
}
