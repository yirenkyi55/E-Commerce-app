import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
import { ProductToDisplay } from 'src/app/core/models';
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
            productBrand: this.titleCase.transform(product.productBrand.name),
            productType: this.titleCase.transform(product.productType.name),
          };
        });
      });
  }

  onNewProduct(): void {
    this.router.navigate(['new', 0], {
      relativeTo: this.route,
    });
  }

  onRecordClick(product: ProductToDisplay): void {
    this.router.navigate([product.id, 'inspect'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }
}
