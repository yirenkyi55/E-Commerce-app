import { Product } from '.';

export interface ShippingInfo {
  id?: string;
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
  id: string;
  product: Product;
  user: User;
  quantityPurchased: number;
  purchasedPrice: number;
  purchasedDate: Date;
  isConfirmed: boolean;
  shippingInfo: ShippingInfo;
}

export interface PurchaseToDisplay {
  id: string;
  productName: string;
  purchasedPrice: string;
  quantityPurchased: string;
  purchasedDate: string;
  userPurchased: string;
  isConfirmed: string;
  totalCost: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  otherName: string;
  lastName: string;
}
