import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from 'src/app/auth/store';
import { DashboardTypes } from './core/enums';
import { AuthUserRequestResponse, DashboardMenu } from './core/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isLoginVisible = false;
  authenticatedRequest$: Observable<boolean>;

  currentUserSubscription: Subscription;
  currentUser: AuthUserRequestResponse;

  dashboardType$: Observable<DashboardTypes>;
  dashboardTye: typeof DashboardTypes = DashboardTypes;

  dashboardMenuItems: DashboardMenu[] = [
    {
      title: 'Products',
      icon: 'stock',
      children: [
        {
          title: 'All Products',
          route: 'admin/products',
        },
        {
          title: 'Product Types',
          route: 'admin/types',
        },
      ],
    },
    {
      title: 'Purchases',
      icon: 'shopping-cart',
      route: 'admin/purchases',
    },
    {
      title: 'Users & Admins',
      icon: 'usergroup-add',
      children: [
        {
          title: 'Admins',
          route: 'admin/users/admin',
        },
        {
          title: 'Users',
          route: 'admin/users',
        },
      ],
    },
    {
      title: 'Settings',
      icon: 'info-circle',
      route: 'admin/settings',
    },
  ];

  constructor(private store: Store<fromStore.AuthenticationState>) {
    this.authenticatedRequest$ = this.store.select(
      fromStore.getAuthenticateRequest
    );
    this.currentUserSubscription = this.store
      .select(fromStore.getCurrentUser)
      .subscribe((user) => {
        this.currentUser = user;
        if (user) {
          this.isLoginVisible = false;
        }
      });
    this.dashboardType$ = this.store.select(fromStore.getDashboardType);
  }

  onLogin(): void {
    this.isLoginVisible = true;
  }

  onCancelled(): void {
    this.isLoginVisible = false;
    this.store.dispatch(fromStore.AuthenticateRequest({ value: false }));
  }

  onLogOut(): void {
    this.store.dispatch(fromStore.Logout());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
