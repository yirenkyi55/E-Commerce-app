import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from 'src/app/auth/store';
import * as fromAppStore from 'src/app/core/store';
import * as fromGuestStore from 'src/app/guests/store';
import { DashboardTypes } from './core/enums';
import {
  AuthUserRequestResponse,
  CartItem,
  DashboardMenu,
} from './core/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoginVisible = false;
  authenticatedRequest$: Observable<boolean>;
  notificationSubscription: Subscription;
  notificationMessageSubscription: Subscription;
  cartItemsSubscription: Subscription;
  totalCart = 0;

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

  constructor(
    private store: Store<fromStore.AuthenticationState>,
    private notification: NzNotificationService,
    private appStore: Store<fromAppStore.ApplicationManagementState>,
    private guestStore: Store<fromGuestStore.GuestState>
  ) {}

  ngOnInit(): void {
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
    this.notificationSubscription = this.appStore
      .select(fromAppStore.getNotification)
      .subscribe((response) => {
        if (response) {
          this.createNotification(
            response.notificationType,
            response.title,
            response.message
          );
        }
      });

    this.cartItemsSubscription = this.guestStore
      .select(fromGuestStore.getCartItems)
      .subscribe((cartItems) => {
        this.totalCart = cartItems
          .map((item) => item.quantity)
          .reduce((total, numb) => total + numb, 0);
      });
  }

  createNotification(type: string, title: string, message: string): void {
    this.notificationMessageSubscription = this.notification
      .create(type, title, message)
      .onClose.subscribe(() => {
        this.appStore.dispatch(fromAppStore.CloseNotification());
      });
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
    this.notificationSubscription?.unsubscribe();
    this.notificationMessageSubscription?.unsubscribe();
  }
}
