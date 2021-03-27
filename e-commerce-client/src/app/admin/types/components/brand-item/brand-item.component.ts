import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductBrand } from 'src/app/core/models';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.scss'],
})
export class BrandItemComponent implements OnInit {
  @Input() brand: ProductBrand;
  @Output() editBrand = new EventEmitter<ProductBrand>();

  constructor() {}

  ngOnInit(): void {}

  onEditBrand(): void {
    this.editBrand.emit(this.brand);
  }
}
