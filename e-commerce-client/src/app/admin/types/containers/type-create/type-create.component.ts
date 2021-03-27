import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateProductTypeModel } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.scss'],
})
export class TypeCreateComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private appStore: Store<fromAppStore.ApplicationManagementState>
  ) {}

  ngOnInit(): void {
    this.loading$ = this.appStore.select(fromAppStore.getTypesLoading);
  }

  onCreateProductType(model: CreateProductTypeModel): void {
    this.appStore.dispatch(fromAppStore.CreateProductTypeRequest({ model }));
  }
}
