import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthUserRequestResponse,
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
      loginRequest
    );
  }

  logOut(): void {
    console.log('inside services');
    localStorage.clear();
  }
}
