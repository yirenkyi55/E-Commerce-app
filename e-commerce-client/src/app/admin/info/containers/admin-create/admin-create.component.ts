import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateAdminModel } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss'],
})
export class AdminCreateComponent implements OnInit {
  adminLoading$: Observable<boolean>;
  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}

  ngOnInit(): void {
    this.adminLoading$ = this.store.select(fromAppStore.getAdminsLoading);
  }

  onCreateAdmin(model: CreateAdminModel): void {
    console.log(model);
    this.store.dispatch(fromAppStore.CreateAdminRequest(model));
  }
}
