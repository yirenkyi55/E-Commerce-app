import {
  CartItem,
  Pagination,
  ProductBrand,
  ProductParams,
  ProductType,
} from 'src/app/core/models';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
import * as fromGuestStore from 'src/app/guests/store';

import { Product } from 'src/app/core/models';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  productTypes$: Observable<ProductType[]>;
  brandsSubscription: Subscription;
  productBrands: ProductBrand[];
  pagination$: Observable<Pagination>;

  constructor(
    private store: Store<fromAppStore.ApplicationManagementState>,
    private guestStore: Store<fromGuestStore.GuestState>
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(fromAppStore.getProducts);
    this.productTypes$ = this.store.select(fromAppStore.getTypes);
    this.pagination$ = this.store.select(fromAppStore.getProductsPagination);
  }

  onAddToCart(cartItem: CartItem): void {
    this.guestStore.dispatch(fromGuestStore.AddToCart(cartItem));
  }

  onFetchProductBrands(model: { typeId: string }): void {
    this.brandsSubscription = this.store
      .select(fromAppStore.getBrandsFromType, { typeId: model.typeId })
      .subscribe((response) => {
        this.productBrands = response;
        if (!response) {
          this.store.dispatch(
            fromAppStore.GetAllBrandsForTypeRequest({ typeId: model.typeId })
          );
        }
      });
  }

  onGetProducts(model: { params: ProductParams }): void {
    this.store.dispatch(fromAppStore.GetProductsRequest(model));
  }

  ngOnDestroy(): void {
    this.brandsSubscription?.unsubscribe();
  }
}
