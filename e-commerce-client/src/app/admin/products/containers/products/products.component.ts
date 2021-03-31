import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
import {
  Pagination,
  ProductBrand,
  ProductParams,
  ProductToDisplay,
  ProductType,
} from 'src/app/core/models';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [CurrencyPipe, TitleCasePipe],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductToDisplay[];
  productsSubscription: Subscription;

  productTypes$: Observable<ProductType[]>;
  brandsSubscription: Subscription;
  productBrands: ProductBrand[];
  pagination$: Observable<Pagination>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppStore.ApplicationManagementState>,
    private currencyPipe: CurrencyPipe,
    private titleCase: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.store
      .select(fromAppStore.getProducts)
      .subscribe((response) => {
        this.products = response.map((product) => {
          return {
            id: product.id,
            name: product.name,
            description:
              product.description.substr(0, 60) +
              (product.description.length > 60 ? '...' : ''),
            picture: product.picture,
            price: this.currencyPipe.transform(product.price).toString(),
            quantity: product.quantity.toString(),
            availability: product.quantity > 0 ? 'Available' : 'Out of Stock',
            productBrand: this.titleCase.transform(product.productBrand.name),
            productType: this.titleCase.transform(product.productType.name),
            showOnHomePage: product.showOnHomePage ? 'Yes' : 'No',
          };
        });
      });

    this.productTypes$ = this.store.select(fromAppStore.getTypes);
    this.pagination$ = this.store.select(fromAppStore.getProductsPagination);
  }

  onNewProduct(): void {
    this.router.navigate(['new', 0], {
      relativeTo: this.route,
    });
  }

  onRecordClick(product: ProductToDisplay): void {
    this.router.navigate([product.id, 'inspect'], { relativeTo: this.route });
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

  onGetProducts(model: { params: ProductParams }): void {
    this.store.dispatch(fromAppStore.GetProductsRequest(model));
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.brandsSubscription?.unsubscribe();
  }
}
