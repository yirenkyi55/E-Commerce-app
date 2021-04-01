import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from 'src/app/auth/store';
import * as fromAppStore from 'src/app/core/store';
import * as fromGuestStore from 'src/app/guests/store';
import { DashboardTypes } from './core/enums';
import {
  AboutModel,
  AuthUserRequestResponse,
  DashboardMenu,
} from './core/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoginVisible = false;
  // authenticatedRequest$: Observable<boolean>;
  notificationSubscription: Subscription;
  notificationMessageSubscription: Subscription;
  cartItemsSubscription: Subscription;
  checkoutSubscription: Subscription;
  totalCart = 0;
  checkoutState: boolean;
  about$: Observable<AboutModel>;

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
      title: 'Admins',
      icon: 'usergroup-add',
      children: [
        {
          title: 'Admin Users',
          route: 'admin/users',
        },
        // {
        //   title: 'Users',
        //   route: 'admin/users',
        // },
      ],
    },
    {
      title: 'Settings',
      icon: 'info-circle',
      children: [
        {
          title: 'Contacts',
          route: 'admin/settings',
        },
        {
          title: 'About',
          route: 'admin/settings/about',
        },
      ],
    },
  ];

  constructor(
    private store: Store<fromStore.AuthenticationState>,
    private notification: NzNotificationService,
    private appStore: Store<fromAppStore.ApplicationManagementState>,
    private guestStore: Store<fromGuestStore.GuestState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.authenticatedRequest$ = this.store.select(
    //   fromStore.getAuthenticateRequest
    // );
    this.currentUserSubscription = this.store
      .select(fromStore.getCurrentUser)
      .subscribe((user) => {
        this.currentUser = user;
        if (user) {
          // this.isLoginVisible = false;
          if (this.checkoutState) {
            this.router.navigate(['shop', 'checkout']);
          }

          this.onCancelled();
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

    this.checkoutSubscription = this.guestStore
      .select(fromGuestStore.getCheckoutState)
      .subscribe((response) => {
        this.checkoutState = response;
        if (response && !this.currentUser) {
          this.isLoginVisible = true;
        }

        if (response && this.currentUser) {
          this.router.navigate(['shop', 'checkout']);
          this.onCancelled();
        }
      });

    this.about$ = this.appStore.select(fromAppStore.getAbout);
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
    // this.store.dispatch(fromStore.AuthenticateRequest({ value: false }));
    this.guestStore.dispatch(fromGuestStore.CheckOutRequestSuccess());
  }

  onLogOut(): void {
    this.store.dispatch(fromStore.Logout());
  }

  onActivate(event: any): void {
    const scrollToTop = window.setInterval(() => {
      const position = window.pageYOffset;
      if (position > 0) {
        window.scrollTo(0, position - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
    this.notificationSubscription?.unsubscribe();
    this.notificationMessageSubscription?.unsubscribe();
    this.checkoutSubscription?.unsubscribe();
  }
}
