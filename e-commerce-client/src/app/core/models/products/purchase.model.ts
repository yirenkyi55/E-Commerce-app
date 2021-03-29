import { Product } from '.';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface PurchaseDetail {
  productId: string;
  quantityPurchased: number;
  purchasedPrice: number;
}

export interface PurchaseModel {
  shippingInfo: ShippingInfo;
  purchaseDetails: PurchaseDetail[];
}

export interface PurchaseResponse {
  product: Product;
  user: User;
  quantityPurchased: number;
  purchasedPrice: number;
  purchasedDate: Date;
  isConfirmed: boolean;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  otherName: string;
  lastName: string;
}
