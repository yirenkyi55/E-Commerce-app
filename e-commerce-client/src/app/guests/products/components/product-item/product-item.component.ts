import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem, Product } from 'src/app/core/models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<CartItem>();

  constructor() {}

  ngOnInit(): void {}

  get outOfStock(): boolean {
    return this.product.quantity === 0;
  }

  onAddToCart(): void {
    if (!this.outOfStock) {
      const cartItem: CartItem = {
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        picture: this.product.picture,
        quantity: 1,
        price: this.product.price,
      };
      this.addToCart.emit(cartItem);
    }
  }
}
