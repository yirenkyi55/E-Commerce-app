import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductToDisplay, TableHeaders } from 'src/app/core/models';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  @Input() products: ProductToDisplay[];
  headers: TableHeaders[] = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
    { key: 'productType', label: 'Type' },
    { key: 'productBrand', label: 'Brand' },
    { key: 'picture', label: 'Image', isImage: true },
    { key: 'showOnHomePage', label: 'On Home Page' },
  ];

  @Output() newProduct = new EventEmitter();
  @Output() recordClick = new EventEmitter<ProductToDisplay>();

  constructor() {}
  ngOnInit(): void {}

  onNewProduct(): void {
    this.newProduct.emit();
  }

  onRecordClick(product: ProductToDisplay): void {
    this.recordClick.emit(product);
  }
}
