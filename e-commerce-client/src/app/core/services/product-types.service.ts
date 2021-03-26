import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CreateProductTypeModel, ProductType } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductTypesService {
  baseUrl = `${environment.apiUrl}/productTypes`;

  constructor(private http: HttpClient) {}

  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.baseUrl}`);
  }

  getProductType(productTypeId: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.baseUrl}/${productTypeId}`);
  }

  createProductType(model: CreateProductTypeModel): Observable<ProductType> {
    return this.http.post<ProductType>(`${this.baseUrl}`, model);
  }

  updateProductType(
    typeId: string,
    model: CreateProductTypeModel
  ): Observable<ProductType> {
    return this.http.put<ProductType>(`${this.baseUrl}/${typeId}`, model);
  }
}
