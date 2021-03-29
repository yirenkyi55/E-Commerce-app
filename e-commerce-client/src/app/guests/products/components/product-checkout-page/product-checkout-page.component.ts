import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CreditCardFormControl,
  DateFormControl,
  SecurityCodeFormControl,
} from 'src/app/core/forms-controls';
import {
  AuthUserRequestResponse,
  CartItem,
  PurchaseDetail,
  ShippingInfo,
} from 'src/app/core/models';

@Component({
  selector: 'app-product-checkout-page',
  templateUrl: './product-checkout-page.component.html',
  styleUrls: ['./product-checkout-page.component.scss'],
})
export class ProductCheckoutPageComponent implements OnInit {
  checkoutForm: FormGroup;
  @Input() cartItems: CartItem[];
  @Input() currentUser: AuthUserRequestResponse;
  @Input() loading: boolean;

  @Output() checkout = new EventEmitter<{
    shippingInfo: ShippingInfo;
    purchaseDetails: PurchaseDetail[];
  }>();

  constructor(private fb: FormBuilder) {}

  createForm(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: [''],
      creditCardNo: new CreditCardFormControl('', [
        Validators.required,
        Validators.minLength(19),
        Validators.maxLength(19),
      ]),
      securityCode: new SecurityCodeFormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern(/^\d+$/),
      ]),
      creditCardExpiry: new DateFormControl('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.createForm();

    if (this.currentUser) {
      this.checkoutForm.patchValue({
        firstName: this.currentUser.firstName.toUpperCase(),
        lastName: this.currentUser.lastName.toUpperCase(),
      });
    }
  }

  get totalPurchase(): number {
    return this.cartItems
      .map((item) => item.price * item.quantity)
      .reduce((sum, cost) => {
        return sum + cost;
      }, 0);
  }

  onPurchaseProduct(): void {
    const shippingInfo: ShippingInfo = {
      firstName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      address: this.checkoutForm.value.address,
      city: this.checkoutForm.value.city,
      postalCode: this.checkoutForm.value.postalCode,
      country: this.checkoutForm.value.country,
      phoneNumber: this.checkoutForm.value.phoneNumber,
    };

    const purchaseDetails: PurchaseDetail[] = this.cartItems.map((cartItem) => {
      return {
        productId: cartItem.id,
        purchasedPrice: cartItem.price,
        quantityPurchased: cartItem.quantity,
      };
    });

    this.checkout.emit({
      shippingInfo,
      purchaseDetails,
    });
  }
}
