import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromGuestStore from 'src/app/guests/store';
import { Observable } from 'rxjs';
import {
  AuthUserRequestResponse,
  CartItem,
  PurchaseDetail,
  ShippingInfo,
} from 'src/app/core/models';
import * as fromAuthStore from 'src/app/auth/store';
import * as fromAppStore from 'src/app/core/store';
@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss'],
})
export class ProductCheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  currentUser$: Observable<AuthUserRequestResponse>;
  loading$: Observable<boolean>;

  constructor(
    private guestStore: Store<fromGuestStore.GuestState>,
    private authStore: Store<fromAuthStore.AuthenticationState>,
    private appStore: Store<fromAppStore.ApplicationManagementState>
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.guestStore.select(fromGuestStore.getCartItems);
    this.currentUser$ = this.authStore.select(fromAuthStore.getCurrentUser);
    this.loading$ = this.appStore.select(fromAppStore.getProductsLoading);
  }

  onCheckout(model: {
    shippingInfo: ShippingInfo;
    purchaseDetails: PurchaseDetail[];
  }): void {
    this.appStore.dispatch(fromAppStore.PurchaseProductsRequest(model));
  }
}
