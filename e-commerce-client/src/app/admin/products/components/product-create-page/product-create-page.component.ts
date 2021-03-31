import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DropDownOptions,
  Product,
  ProductBrand,
  ProductType,
} from 'src/app/core/models';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss'],
  providers: [TitleCasePipe],
})
export class ProductCreatePageComponent
  implements OnInit, OnChanges, AfterContentChecked {
  @Input() productTypes: ProductType[];
  @Input() productBrands: ProductBrand[];
  @Input() productToUpdate: Product;

  @Input() loading: boolean;
  clearUploadList: boolean;

  @Output() fetchProductBrands = new EventEmitter<{ typeId: string }>();
  @Output() createProduct = new EventEmitter<FormData>();
  @Output() updateProduct = new EventEmitter<{
    productId: string;
    productForm: FormData;
  }>();

  productForm: FormGroup;
  hasFile: boolean;
  formData: FormData;
  hasTypeChange: boolean;

  productTypeOptions: DropDownOptions[] = [];

  brandsOptions: DropDownOptions[] = [];

  constructor(
    private fb: FormBuilder,
    private titleCase: TitleCasePipe,
    private cd: ChangeDetectorRef
  ) {}
  ngAfterContentChecked(): void {
    //this.cd.detectChanges();
  }

  get pageTitle(): string {
    return this.productToUpdate ? 'Update Product' : 'Create Product';
  }

  get buttonText(): string {
    return this.productToUpdate ? 'Update' : 'Save';
  }

  createForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      productTypeId: ['', [Validators.required]],
      productBrandId: ['', [Validators.required]],
      showOnHomePage: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.createForm();
    if (this.productTypes) {
      const values = this.productTypes.map((type) => {
        return {
          label: this.titleCase.transform(type.name),
          value: type.id,
        };
      });

      this.productTypeOptions = [];

      this.productTypeOptions = [...this.productTypeOptions, ...values];
    }

    if (this.productToUpdate) {
      //console.log('setting values', this.productToUpdate);
      this.productForm.setValue({
        name: this.productToUpdate.name,
        description: this.productToUpdate.description,
        price: this.productToUpdate.price.toString(),
        quantity: this.productToUpdate.quantity,
        productTypeId: this.productToUpdate.productType.id,
        productBrandId: this.productToUpdate.productBrand.id,
        showOnHomePage: this.productToUpdate.showOnHomePage,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { productBrands, loading } = changes;
    if (productBrands && productBrands.currentValue) {
      if (this.productBrands?.length > 0) {
        const values = this.productBrands.map((brand) => {
          return {
            label: this.titleCase.transform(brand.name),
            value: brand.id,
          };
        });
        this.brandsOptions = [];

        this.brandsOptions = [...this.brandsOptions, ...values];
      } else {
        this.brandsOptions = [];
      }

      if (this.hasTypeChange) {
        console.log('patching values');
        this.productForm.patchValue({
          productBrandId: '',
        });
      }
    }

    if (loading && loading.previousValue && !loading.currentValue) {
      // We Reset the form if saving was successful
      this.onResetForm();
    }
  }

  get isFormValid(): boolean {
    return this.productToUpdate
      ? this.productForm.valid
      : this.hasFile && this.productForm.valid;
  }

  onCreateProduct(): void {
    if (!this.productToUpdate) {
      this.formData.append('name', this.productForm.value.name);
      this.formData.append('description', this.productForm.value.description);
      this.formData.append('price', this.productForm.value.price);
      this.formData.append('quantity', this.productForm.value.quantity);
      this.formData.append(
        'productTypeId',
        this.productForm.value.productTypeId
      );
      this.formData.append(
        'productBrandId',
        this.productForm.value.productBrandId
      );
      this.formData.append(
        'showOnHomePage',
        this.productForm.value.showOnHomePage
      );

      this.createProduct.emit(this.formData);
    } else {
      const formData = this.formData ? this.formData : new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price);
      formData.append('quantity', this.productForm.value.quantity);
      formData.append('productTypeId', this.productForm.value.productTypeId);
      formData.append('productBrandId', this.productForm.value.productBrandId);
      formData.append('showOnHomePage', this.productForm.value.showOnHomePage);

      this.updateProduct.emit({
        productId: this.productToUpdate.id,
        productForm: formData,
      });
    }
  }

  onResetForm(): void {
    this.productForm.reset();
    this.clearUploadList = true;
  }

  checkFileStatus(model: boolean): void {
    this.hasFile = model;
    if (!model) {
      this.formData = null;
    }
  }

  onUploadPhoto(data: FormData): void {
    this.formData = data;
    this.clearUploadList = false;
  }

  onProductTypeChange(typeId: string): void {
    if (typeId) {
      this.hasTypeChange = true;
      this.fetchProductBrands.emit({ typeId });
    }
  }
}
