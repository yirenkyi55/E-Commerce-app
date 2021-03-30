import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseResponse, PurchaseToDisplay } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss'],
  providers: [TitleCasePipe, DatePipe, CurrencyPipe],
})
export class PurchasesListComponent implements OnInit, OnDestroy {
  purchasesSubscription: Subscription;
  purchasesToDisplay: PurchaseToDisplay[];

  constructor(
    private appStore: Store<fromAppStore.ApplicationManagementState>,
    private titleCase: TitleCasePipe,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.purchasesSubscription = this.appStore
      .select(fromAppStore.getPurchases)
      .subscribe((purchases) => {
        this.purchasesToDisplay = purchases.map((purchase) => {
          return {
            id: purchase.id,
            productName: this.titleCase.transform(purchase.product.name),
            quantityPurchased: purchase.quantityPurchased.toString(),
            purchasedPrice: this.currencyPipe.transform(
              purchase.purchasedPrice
            ),
            purchasedDate: this.datePipe.transform(
              purchase.purchasedDate,
              'MMM d, y, h:mm:ss'
            ),
            userPurchased: `${this.titleCase.transform(
              purchase.user.firstName
            )} ${this.titleCase.transform(purchase.user.lastName)}`,
            isConfirmed: purchase.isConfirmed ? 'Delivered' : 'Not Delivered',
            totalCost: this.currencyPipe.transform(
              purchase.purchasedPrice * purchase.quantityPurchased
            ),
          };
        });
      });
  }

  onPurchaseClick(model: PurchaseToDisplay): void {
    this.router.navigate([model.id, 'inspect'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.purchasesSubscription?.unsubscribe();
  }
}
