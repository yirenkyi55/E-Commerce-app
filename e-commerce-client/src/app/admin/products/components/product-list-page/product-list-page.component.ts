import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  constructor() {}
  @Output() newProduct = new EventEmitter();

  ngOnInit(): void {}

  onNewProduct(): void {
    this.newProduct.emit();
  }
}
