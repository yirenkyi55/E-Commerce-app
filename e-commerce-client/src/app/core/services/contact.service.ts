import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactModel, ContactResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  sendContact(contact: ContactModel): Observable<any> {
    return this.http.post(`${this.baseUrl}`, contact);
  }

  getAllContacts(): Observable<ContactResponse[]> {
    return this.http.get<ContactResponse[]>(`${this.baseUrl}`);
  }
}
