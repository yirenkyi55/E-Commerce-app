import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/core/models';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
@Component({
  selector: 'app-type-inspect',
  templateUrl: './type-inspect.component.html',
  styleUrls: ['./type-inspect.component.scss'],
})
export class TypeInspectComponent implements OnInit {
  productType$: Observable<ProductType>;

  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}

  ngOnInit(): void {
    this.productType$ = this.store.select(fromAppStore.getSeletedType);
  }
}
