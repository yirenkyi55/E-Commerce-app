import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as fromAppStore from 'src/app/core/store';
import { ProductType } from 'src/app/core/models';
@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss'],
})
export class TypeListComponent implements OnInit {
  productTypes$: Observable<ProductType[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppStore.ApplicationManagementState>
  ) {}

  ngOnInit(): void {
    this.productTypes$ = this.store.select(fromAppStore.getTypes);
  }

  onCreateType(): void {
    this.router.navigate(['new', 0], {
      relativeTo: this.route,
    });
  }

  onRecordClick(productType: ProductType): void {
    this.router.navigate([productType.id, 'inspect'], {
      relativeTo: this.route,
    });
  }
}
