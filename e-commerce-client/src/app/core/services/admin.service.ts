import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AboutModel,
  Contact,
  CreateAboutModel,
  CreateAdminModel,
  User,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admins`);
  }

  createAdmin(adminModel: CreateAdminModel): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/admins`, adminModel);
  }

  getAbout(): Observable<AboutModel> {
    return this.http.get<AboutModel>(`${this.baseUrl}/abouts`);
  }

  createAbout(aboutModel: CreateAboutModel): Observable<AboutModel> {
    return this.http.post<AboutModel>(`${this.baseUrl}/abouts`, aboutModel);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
  }
}
