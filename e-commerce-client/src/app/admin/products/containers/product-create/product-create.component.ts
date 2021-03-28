import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductBrand, ProductType } from 'src/app/core/models';
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
  productSubscription: Subscription;
  product: Product;

  constructor(
    private store: Store<fromAppStore.ApplicationManagementState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productTypes$ = this.store.select(fromAppStore.getTypes);
    this.loading$ = this.store.select(fromAppStore.getProductsLoading);

    const id = this.route.snapshot.paramMap.get('productId');
    if (id !== '0') {
      this.productSubscription = this.store
        .select(fromAppStore.getSelectedProduct)
        .subscribe((selectedProduct) => {
          this.product = selectedProduct;

          this.brandsSubscription = this.store
            .select(fromAppStore.getBrandsFromType, {
              typeId: selectedProduct.productType.id,
            })
            .subscribe((response) => {
              this.productBrands = response;

              if (!response) {
                this.store.dispatch(
                  fromAppStore.GetAllBrandsForTypeRequest({
                    typeId: selectedProduct.productType.id,
                  })
                );
              }
            });
        });
    }
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
    this.productSubscription?.unsubscribe();
  }
}
