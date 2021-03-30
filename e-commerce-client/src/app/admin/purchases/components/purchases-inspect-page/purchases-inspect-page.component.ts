import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InspectModeContent, PurchaseResponse } from 'src/app/core/models';

@Component({
  selector: 'app-purchases-inspect-page',
  templateUrl: './purchases-inspect-page.component.html',
  styleUrls: ['./purchases-inspect-page.component.scss'],
  providers: [TitleCasePipe, DatePipe, CurrencyPipe],
})
export class PurchasesInspectPageComponent implements OnInit, OnChanges {
  @Input() purchase: PurchaseResponse;
  listContentType: InspectModeContent[];

  @Output() changePurchaseStatus = new EventEmitter<PurchaseResponse>();

  constructor(
    private titleCase: TitleCasePipe,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { purchase } = changes;
    if (purchase && purchase.currentValue) {
      console.log(purchase);
      if (this.purchase) {
        this.listContentType = [
          {
            text: this.titleCase.transform(this.purchase.product.name),
            title: 'Product Name',
            isMultiple: false,
          },
          {
            isMultiple: true,
            contents: [
              {
                title: 'Purchased Price',
                text: this.currencyPipe.transform(this.purchase.purchasedPrice),
              },
              {
                title: 'Quantity',
                text: this.purchase.quantityPurchased.toString(),
              },
              {
                title: 'Total Cost',
                text: `${this.currencyPipe.transform(
                  this.purchase.quantityPurchased * this.purchase.purchasedPrice
                )}`,
              },
              {
                title: 'Date Purchased',
                text: this.datePipe.transform(
                  this.purchase.purchasedDate,
                  'MMM d, y, h:mm:ss'
                ),
              },
              {
                title: 'Status',
                text: this.purchase.isConfirmed ? 'Delivered' : 'Not Delivered',
              },
            ],
          },
          {
            isMultiple: true,
            contents: [
              {
                title: 'Purchased by',
                text: `${this.titleCase.transform(
                  this.purchase.user.firstName
                )} ${this.titleCase.transform(this.purchase.user.lastName)}`,
              },
            ],
          },
          {
            isMultiple: true,
            contents: [
              {
                title: 'Shipping Name',
                text: `${this.titleCase.transform(
                  this.purchase.shippingInfo?.firstName
                )} ${this.titleCase.transform(
                  this.purchase.shippingInfo?.lastName
                )}`,
              },
              {
                title: 'Shipping Address',
                text: this.purchase.shippingInfo?.address,
              },
              {
                title: 'Postal Code',
                text: this.purchase.shippingInfo?.postalCode,
              },
              {
                title: 'Country',
                text: this.titleCase.transform(
                  this.purchase.shippingInfo?.country
                ),
              },
              {
                title: 'City',
                text: this.titleCase.transform(
                  this.purchase.shippingInfo?.city
                ),
              },
              {
                title: 'Phone Number',
                text: this.purchase.shippingInfo?.phoneNumber,
              },
            ],
          },
        ];
      }
    }
  }

  ngOnInit(): void {}

  get deliveredStatus(): string {
    return this.purchase.isConfirmed ? 'Not Delivered' : 'Delivered';
  }

  toggleStatus(): void {
    this.changePurchaseStatus.emit(this.purchase);
  }
}
