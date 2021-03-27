import { TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { InspectModeContent, ProductType } from 'src/app/core/models';

@Component({
  selector: 'app-type-inspect-page',
  templateUrl: './type-inspect-page.component.html',
  styleUrls: ['./type-inspect-page.component.scss'],
  providers: [TitleCasePipe],
})
export class TypeInspectPageComponent implements OnInit, OnChanges {
  @Input() productType: ProductType;
  listContentType: InspectModeContent[];

  constructor(private titleCase: TitleCasePipe) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { productType } = changes;
    if (productType && productType.currentValue) {
      this.listContentType = [
        {
          title: 'Product Type',
          isMultiple: false,
          text: this.titleCase.transform(this.productType.name),
        },
      ];
    }
  }

  ngOnInit(): void {}
}
