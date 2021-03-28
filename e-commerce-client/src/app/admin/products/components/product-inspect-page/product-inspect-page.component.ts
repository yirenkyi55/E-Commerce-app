import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InspectModeContent, Product } from 'src/app/core/models';

@Component({
  selector: 'app-product-inspect-page',
  templateUrl: './product-inspect-page.component.html',
  styleUrls: ['./product-inspect-page.component.scss'],
  providers: [TitleCasePipe, CurrencyPipe],
})
export class ProductInspectPageComponent implements OnInit, OnChanges {
  @Input() product: Product;
  productListData: InspectModeContent[];

  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();

  constructor(
    private titleCase: TitleCasePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { product } = changes;
    if (product && product.currentValue) {
      this.productListData = [
        {
          title: 'Name',
          isMultiple: false,
          text: this.titleCase.transform(this.product.name),
        },
        {
          title: 'Description',
          isMultiple: false,
          text: this.product.description,
        },
        {
          isMultiple: true,
          contents: [
            {
              title: 'Price',
              text: this.currencyPipe.transform(this.product.price),
            },
            {
              title: 'Type',
              text: this.titleCase.transform(this.product.productType.name),
            },
            {
              title: 'Brand',
              text: this.titleCase.transform(this.product.productBrand.name),
            },
          ],
        },
        {
          title: 'Image',
          isMultiple: false,
          isImage: true,
          text: this.product.picture,
        },
      ];
    }
  }

  onEditContent(): void {
    this.editProduct.emit(this.product);
  }

  onDeleteContent(): void {
    this.deleteProduct.emit(this.product);
  }
  ngOnInit(): void {}
}
