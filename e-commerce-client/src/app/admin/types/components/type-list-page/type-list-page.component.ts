import { TitleCasePipe } from '@angular/common';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ProductType } from 'src/app/core/models';

@Component({
  selector: 'app-type-list-page',
  templateUrl: './type-list-page.component.html',
  styleUrls: ['./type-list-page.component.scss'],
  providers: [TitleCasePipe],
})
export class TypeListPageComponent implements OnInit, OnChanges {
  @Input() productTypes: ProductType[];
  @Output() createType = new EventEmitter();
  @Output() recordClick = new EventEmitter<ProductType>();

  headers = [{ key: 'name', label: 'Product Type' }];
  constructor(private titleCase: TitleCasePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { productTypes } = changes;
    if (productTypes && productTypes.currentValue) {
      this.productTypes = this.productTypes.map((type) => {
        return {
          id: type.id,
          name: this.titleCase.transform(type.name),
        };
      });
    }
  }

  ngOnInit(): void {}

  onCreateType(): void {
    this.createType.emit();
  }

  onRecordClick(data: ProductType): void {
    this.recordClick.emit(data);
  }
}
