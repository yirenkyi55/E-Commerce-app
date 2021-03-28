import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from 'src/app/core/store';
import { Product } from 'src/app/core/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}

  ngOnInit(): void {
    this.products$ = this.store.select(fromAppStore.getHomePageProducts);
  }
}
