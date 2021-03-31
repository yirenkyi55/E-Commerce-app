import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CartItem,
  Pagination,
  Product,
  ProductBrand,
  ProductParams,
  ProductType,
} from 'src/app/core/models';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Input() productTypes: ProductType[];
  @Input() brands: ProductBrand[];
  @Input() pagination: Pagination;

  productParam = new ProductParams();
  filterForm: FormGroup;
  hasFilter = false;
  hasSearch = false;
  priceList = [
    { value: 'price_asc', label: 'Higest' },
    { value: 'price_desc', label: 'Lowest' },
  ];

  @Output() addToCart = new EventEmitter<CartItem>();
  @Output() fetchProductBrands = new EventEmitter<{ typeId: string }>();
  @Output() getProducts = new EventEmitter<{ params: ProductParams }>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { brands } = changes;
    if (brands && this.filterForm) {
      this.filterForm.patchValue({
        brandId: '',
      });
    }
  }

  get isValidFilter(): boolean {
    return (
      this.filterForm.value.typeId ||
      this.filterForm.value.brandId ||
      this.filterForm.value.price
    );
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      typeId: '',
      brandId: '',
      price: '',
    });
  }

  onAddToCart(cartItem: CartItem): void {
    this.addToCart.emit(cartItem);
  }

  onProductTypeChange(typeId: string): void {
    if (typeId) {
      this.fetchProductBrands.emit({ typeId });
    }
  }

  // Filtering Products

  onFilterProduct(): void {
    this.productParam = {
      ...this.productParam,
      typeId: this.filterForm.value.typeId,
      brandId: this.filterForm.value.brandId,
      priceSort: this.filterForm.value.price,
    };

    this.getProducts.emit({ params: this.productParam });
    this.hasFilter = true;
  }

  onRemoveFilter(): void {
    this.productParam = {
      ...this.productParam,
      typeId: null,
      brandId: null,
    };

    this.getProducts.emit({ params: this.productParam });

    this.filterForm.setValue({
      typeId: '',
      brandId: '',
      price: '',
    });

    this.hasFilter = false;
  }

  // Searching Products
  onSearchProduct(searchTearm: string): void {
    if (searchTearm) {
      this.productParam = {
        ...this.productParam,
        search: searchTearm,
      };
      this.getProducts.emit({ params: this.productParam });
      this.hasSearch = true;
    }
  }

  onSearchChange(searchTerm: string): void {
    if (!searchTerm && this.hasSearch) {
      this.productParam = {
        ...this.productParam,
        search: null,
      };
      this.getProducts.emit({ params: this.productParam });
      this.hasSearch = false;
    }
  }

  // Pagination on products
  onPaginate(pageNumber: number): void {
    this.productParam = {
      ...this.productParam,
      pageNumber: pageNumber,
    };
    this.getProducts.emit({ params: this.productParam });
  }
}
