import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductBrand, ProductType } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  productTypes$: Observable<ProductType[]>;
  loading$: Observable<boolean>;
  productBrands: ProductBrand[];
  brandsSubscription: Subscription;

  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}

  ngOnInit(): void {
    this.productTypes$ = this.store.select(fromAppStore.getTypes);
    this.loading$ = this.store.select(fromAppStore.getProductsLoading);
  }

  onFetchProductBrands(model: { typeId: string }): void {
    this.brandsSubscription = this.store
      .select(fromAppStore.getBrandsFromType, { typeId: model.typeId })
      .subscribe((response) => {
        this.productBrands = response;
        if (!response) {
          this.store.dispatch(
            fromAppStore.GetAllBrandsForTypeRequest({ typeId: model.typeId })
          );
        }
      });
  }

  onCreateProduct(productForm: FormData): void {
    this.store.dispatch(fromAppStore.CreateProductRequest({ productForm }));
  }

  ngOnDestroy(): void {
    this.brandsSubscription?.unsubscribe();
  }
}
