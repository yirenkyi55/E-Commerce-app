import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/core/models';

@Component({
  selector: 'app-product-cart-page',
  templateUrl: './product-cart-page.component.html',
  styleUrls: ['./product-cart-page.component.scss'],
})
export class ProductCartPageComponent implements OnInit {
  @Input() cartItems: CartItem[];
  @Output() decreaseCart = new EventEmitter<CartItem>();
  @Output() increaseCart = new EventEmitter<CartItem>();
  @Output() checkout = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get totalPurchase(): number {
    return this.cartItems
      .map((item) => item.price * item.quantity)
      .reduce((sum, cost) => {
        return sum + cost;
      }, 0);
  }

  onDecreseCartItem(cartItem: CartItem): void {
    this.decreaseCart.emit(cartItem);
  }

  onIncreaseCartItem(cartItem: CartItem): void {
    this.increaseCart.emit(cartItem);
  }

  onCheckOut(): void {
    this.checkout.emit();
  }
}
