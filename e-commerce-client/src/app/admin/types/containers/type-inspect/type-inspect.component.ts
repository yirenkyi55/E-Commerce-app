import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ProductType,
  CreateProductBrandModel,
  ProductBrand,
} from 'src/app/core/models';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-type-inspect',
  templateUrl: './type-inspect.component.html',
  styleUrls: ['./type-inspect.component.scss'],
})
export class TypeInspectComponent implements OnInit, OnDestroy {
  productType: ProductType;
  isLoading$: Observable<boolean>;
  productTypeSubscription: Subscription;
  productBrands$: Observable<ProductBrand[]>;

  constructor(
    private store: Store<fromAppStore.ApplicationManagementState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productTypeSubscription = this.store
      .select(fromAppStore.getSelectedType)
      .subscribe((response) => {
        if (response) {
          this.productType = response;
          this.loadAllBrandsForType(response.id);
        }
      });
    this.isLoading$ = this.store.select(fromAppStore.getBrandsLoading);
    this.productBrands$ = this.store.select(fromAppStore.getSelectedBrands);
  }

  onSaveBrand(model: { typeId: string; brand: CreateProductBrandModel }): void {
    this.store.dispatch(fromAppStore.CreateProductBrandRequest(model));
  }

  onUpdateBrand(model: {
    typeId: string;
    brandId: string;
    brand: CreateProductBrandModel;
  }): void {
    this.store.dispatch(fromAppStore.UpdateProductBrandRequest(model));
  }

  loadAllBrandsForType(typeId: string): void {
    this.store.dispatch(fromAppStore.GetAllBrandsForTypeRequest({ typeId }));
  }

  onEditType(productType: ProductType): void {
    this.router.navigate(['admin/types/new', productType.id]);
  }

  ngOnDestroy(): void {
    this.productTypeSubscription?.unsubscribe();
  }
}
