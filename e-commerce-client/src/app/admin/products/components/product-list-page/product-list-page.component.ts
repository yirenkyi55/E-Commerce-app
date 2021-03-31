import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Pagination,
  ProductBrand,
  ProductParams,
  ProductToDisplay,
  ProductType,
  TableHeaders,
} from 'src/app/core/models';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit, OnChanges {
  @Input() products: ProductToDisplay[];
  headers: TableHeaders[] = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
    { key: 'quantity', label: 'Quanitity' },
    { key: 'availability', label: 'Status' },
    { key: 'productType', label: 'Type' },
    { key: 'productBrand', label: 'Brand' },
    { key: 'picture', label: 'Image', isImage: true },
    { key: 'showOnHomePage', label: 'On Home Page' },
  ];

  @Output() newProduct = new EventEmitter();
  @Output() recordClick = new EventEmitter<ProductToDisplay>();

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

  @Output() fetchProductBrands = new EventEmitter<{ typeId: string }>();
  @Output() getProducts = new EventEmitter<{ params: ProductParams }>();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      typeId: '',
      brandId: '',
      price: '',
    });
  }

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

  onNewProduct(): void {
    this.newProduct.emit();
  }

  onRecordClick(product: ProductToDisplay): void {
    this.recordClick.emit(product);
  }
}
