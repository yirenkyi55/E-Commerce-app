import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem, Product } from 'src/app/core/models';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  @Input() products: Product[];

  @Output() addToCart = new EventEmitter<CartItem>();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(cartItem: CartItem): void {
    this.addToCart.emit(cartItem);
  }
}
