import {
  Product,
  ProductParams,
  PurchaseModel,
  PurchaseResponse,
} from 'src/app/core/models';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { PaginationResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(
    productParams: ProductParams,
    homePage = false
  ): Observable<PaginationResult<Product>> {
    let params = new HttpParams();

    if (productParams.brandId) {
      params = params.append('brandId', productParams.brandId);
    }

    if (productParams.typeId) {
      params = params.append('typeId', productParams.typeId);
    }

    if (productParams.search) {
      params = params.append('search', productParams.search);
    }

    params = params.append('pageSize', productParams.pageSize.toString());
    params = params.append('pageNumber', productParams.pageNumber.toString());
    params = params.append('homePage', homePage.toString());

    return this.http.get<PaginationResult<Product>>(`${this.baseUrl}`, {
      params,
    });
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  createProduct(productForm: FormData): Observable<HttpEvent<Product>> {
    const request = new HttpRequest('POST', `${this.baseUrl}`, productForm, {
      reportProgress: true,
    });
    return this.http.request<Product>(request);
  }

  updateProduct(
    productId: string,
    productForm: FormData
  ): Observable<HttpEvent<Product>> {
    const request = new HttpRequest(
      'PUT',
      `${this.baseUrl}/${productId}`,
      productForm,
      {
        reportProgress: true,
      }
    );
    return this.http.request<Product>(request);
  }

  purchaseProduct(purchaseForm: PurchaseModel): Observable<PurchaseResponse[]> {
    return this.http.post<PurchaseResponse[]>(
      `${this.baseUrl}/purchases`,
      purchaseForm
    );
  }

  getAllPurchases(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(`${this.baseUrl}/purchases`);
  }

  togglePurchaseConfirm(purchaseId: string): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(
      `${this.baseUrl}/purchases/${purchaseId}/confirm`,
      {}
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
