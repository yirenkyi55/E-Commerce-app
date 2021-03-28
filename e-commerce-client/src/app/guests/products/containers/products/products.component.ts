import { CartItem } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
import * as fromGuestStore from 'src/app/guests/store';

import { Product } from 'src/app/core/models';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(
    private store: Store<fromAppStore.ApplicationManagementState>,
    private guestStore: Store<fromGuestStore.GuestState>
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(fromAppStore.getProducts);
  }

  onAddToCart(cartItem: CartItem): void {
    this.guestStore.dispatch(fromGuestStore.AddToCart(cartItem));
  }
}
