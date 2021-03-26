import { ProductBrand } from './product-brand.models';
import { ProductType } from './product-types.models';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  picture: string;
  productType: ProductType;
  productBrand: ProductBrand;
}
