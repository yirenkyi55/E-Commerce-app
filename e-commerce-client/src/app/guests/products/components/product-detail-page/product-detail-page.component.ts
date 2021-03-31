import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem, Product } from 'src/app/core/models';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<CartItem>();

  constructor() {}

  ngOnInit(): void {}

  get avaiable(): boolean {
    return this.product.quantity > 0;
  }

  onAddToCart(): void {
    this.addToCart.emit({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      picture: this.product.picture,
      quantity: 1,
      description: this.product.description,
    });
  }
}
