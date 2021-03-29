import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/core/models';
import * as fromGuestStore from 'src/app/guests/store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;

  constructor(private guestStore: Store<fromGuestStore.GuestState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.guestStore.select(fromGuestStore.getCartItems);
  }

  onDecreaseCart(cartItem: CartItem): void {
    this.guestStore.dispatch(fromGuestStore.RemoveFromCart(cartItem));
  }

  onIncreaseCart(cartItem: CartItem): void {
    this.guestStore.dispatch(fromGuestStore.AddToCart(cartItem));
  }
}
