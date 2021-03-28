import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-inspect',
  templateUrl: './product-inspect.component.html',
  styleUrls: ['./product-inspect.component.scss'],
})
export class ProductInspectComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private store: Store<fromAppStore.ApplicationManagementState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$ = this.store.select(fromAppStore.getSelectedProduct);
  }

  onEditProduct(product: Product): void {
    this.router.navigate(['admin', 'products', 'new', product.id]);
  }
}
