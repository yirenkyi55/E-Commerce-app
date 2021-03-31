import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem, Product } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
import * as fromGuestStore from 'src/app/guests/store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private appStore: Store<fromAppStore.ApplicationManagementState>,
    private guestStore: Store<fromGuestStore.GuestState>
  ) {}

  onAddToCart(cartItem: CartItem): void {
    this.guestStore.dispatch(fromGuestStore.AddToCart(cartItem));
  }

  ngOnInit(): void {
    this.product$ = this.appStore.select(fromAppStore.getSelectedProduct);
  }
}
