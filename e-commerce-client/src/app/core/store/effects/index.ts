import { ProductBrandsEffect } from './product-brands.effects';
import { ProductTypeEffect } from './product-types.effects';
import { ProductsEffect } from './products.effects';

export const effects: any[] = [
  ProductBrandsEffect,
  ProductTypeEffect,
  ProductsEffect,
];

export * from './product-brands.effects';
export * from './product-types.effects';
export * from './products.effects';
