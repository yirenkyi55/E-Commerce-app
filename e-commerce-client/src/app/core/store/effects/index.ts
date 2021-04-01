import { ProductBrandsEffect } from './product-brands.effects';
import { ProductTypeEffect } from './product-types.effects';
import { ProductsEffect } from './products.effects';
import { PurchaseEffect } from './purchases.effects';
import { AdminsEffect } from './admins.effects';

export const effects: any[] = [
  ProductBrandsEffect,
  ProductTypeEffect,
  ProductsEffect,
  PurchaseEffect,
  AdminsEffect,
];

export * from './product-brands.effects';
export * from './product-types.effects';
export * from './products.effects';
export * from './purchases.effects';
export * from './admins.effects';
