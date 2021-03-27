import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateProductTypeModel, ProductType } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.scss'],
})
export class TypeCreateComponent implements OnInit {
  loading$: Observable<boolean>;
  productType$: Observable<ProductType>;

  constructor(
    private appStore: Store<fromAppStore.ApplicationManagementState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading$ = this.appStore.select(fromAppStore.getTypesLoading);
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '0') {
      this.productType$ = this.appStore.select(fromAppStore.getSelectedType);
    }
  }

  onCreateProductType(model: CreateProductTypeModel): void {
    this.appStore.dispatch(fromAppStore.CreateProductTypeRequest({ model }));
  }

  onUpdateProductType(updateModel: {
    id: string;
    model: CreateProductTypeModel;
  }): void {
    this.appStore.dispatch(fromAppStore.UpdateProductTypeRequest(updateModel));
  }
}
