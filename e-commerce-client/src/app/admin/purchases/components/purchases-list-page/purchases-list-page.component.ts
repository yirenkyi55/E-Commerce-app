import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PurchaseToDisplay } from 'src/app/core/models';

@Component({
  selector: 'app-purchases-list-page',
  templateUrl: './purchases-list-page.component.html',
  styleUrls: ['./purchases-list-page.component.scss'],
})
export class PurchasesListPageComponent implements OnInit {
  headers = [
    { key: 'productName', label: 'Product' },
    { key: 'quantityPurchased', label: 'Purchased Qty' },
    { key: 'purchasedPrice', label: 'Purchased At' },
    { key: 'totalCost', label: 'Total Cost' },
    { key: 'purchasedDate', label: 'Date' },
    { key: 'userPurchased', label: 'User' },
    { key: 'isConfirmed', label: 'Status' },
  ];

  @Input() purchasesToDisplay: PurchaseToDisplay[];

  @Output() purchaseClick = new EventEmitter<PurchaseToDisplay>();

  constructor() {}

  ngOnInit(): void {}

  onRecordClick(model: PurchaseToDisplay): void {
    this.purchaseClick.emit(model);
  }
}
