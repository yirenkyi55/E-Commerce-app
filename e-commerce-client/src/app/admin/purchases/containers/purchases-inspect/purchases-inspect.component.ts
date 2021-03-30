import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PurchaseResponse } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';

@Component({
  selector: 'app-purchases-inspect',
  templateUrl: './purchases-inspect.component.html',
  styleUrls: ['./purchases-inspect.component.scss'],
})
export class PurchasesInspectComponent implements OnInit {
  purchase$: Observable<PurchaseResponse>;

  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}

  ngOnInit(): void {
    this.purchase$ = this.store.select(fromAppStore.getSelectedPurchases);
  }

  onChangeStatus(purchase: PurchaseResponse): void {
    this.store.dispatch(
      fromAppStore.ToggleDeliveryRequest({ purchaseId: purchase.id })
    );
  }
}
