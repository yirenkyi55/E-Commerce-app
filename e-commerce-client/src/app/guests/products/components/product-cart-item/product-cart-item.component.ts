import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/core/models';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.component.html',
  styleUrls: ['./product-cart-item.component.scss'],
})
export class ProductCartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() decreaseCart = new EventEmitter<CartItem>();
  @Output() increaseCart = new EventEmitter<CartItem>();

  constructor() {}

  ngOnInit(): void {}

  decreseCartItem(): void {
    this.decreaseCart.emit(this.cartItem);
  }

  increaseCartItem(): void {
    this.increaseCart.emit(this.cartItem);
  }
}
