import { CreateProductBrandModel } from 'src/app/core/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductBrand } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductBrandsService {
  baseUrl = `${environment.apiUrl}/productTypes`;

  constructor(private http: HttpClient) {}

  getProductBrands(typeId: string): Observable<ProductBrand[]> {
    return this.http.get<ProductBrand[]>(`${this.baseUrl}/${typeId}/brands`);
  }

  createProductBrand(
    typeId: string,
    model: CreateProductBrandModel
  ): Observable<ProductBrand> {
    return this.http.post<ProductBrand>(
      `${this.baseUrl}/${typeId}/brands`,
      model
    );
  }

  updateProductBrand(
    typeId: string,
    brandId: string,
    model: CreateProductBrandModel
  ): Observable<ProductBrand> {
    return this.http.put<ProductBrand>(
      `${this.baseUrl}/${typeId}/brands/${brandId}`,
      model
    );
  }
}
