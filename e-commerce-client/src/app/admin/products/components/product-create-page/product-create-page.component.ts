import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
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
export class ProductCreatePageComponent implements OnInit, OnChanges {
  @Input() productTypes: ProductType[];
  @Input() productBrands: ProductBrand[];
  @Input() loading: boolean;
  clearUploadList: boolean;

  @Output() fetchProductBrands = new EventEmitter<{ typeId: string }>();
  @Output() createProduct = new EventEmitter<FormData>();

  productForm: FormGroup;
  hasFile: boolean;
  formData: FormData;

  productTypeOptions: DropDownOptions[] = [
    {
      label: 'Select Product Type',
      value: '',
    },
    {
      label: 'product type 1',
      value: 1,
    },
  ];

  brandsOptions: DropDownOptions[] = [
    {
      label: 'Select Brand',
      value: '',
    },
  ];

  constructor(private fb: FormBuilder, private titleCase: TitleCasePipe) {}

  createForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      productTypeId: ['', [Validators.required]],
      productBrandId: ['', [Validators.required]],
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

      this.productTypeOptions = [
        {
          label: 'Select Product Type',
          value: '',
        },
      ];

      this.productTypeOptions = [...this.productTypeOptions, ...values];
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
        this.brandsOptions = [
          {
            label: 'Select Brand',
            value: '',
          },
        ];

        this.brandsOptions = [...this.brandsOptions, ...values];
      } else {
        this.brandsOptions = [
          {
            label: 'Select Brand',
            value: '',
          },
        ];
      }
    }

    if (loading && loading.previousValue && !loading.currentValue) {
      // We Reset the form if saving was successful
      this.onResetForm();
    }
  }

  get isFormValid(): boolean {
    return this.hasFile && this.productForm.valid;
  }
  onCreateProduct(): void {
    if (this.isFormValid) {
      this.formData.append('name', this.productForm.value.name);
      this.formData.append('description', this.productForm.value.description);
      this.formData.append('price', this.productForm.value.price);
      this.formData.append(
        'productTypeId',
        this.productForm.value.productTypeId
      );
      this.formData.append(
        'productBrandId',
        this.productForm.value.productBrandId
      );

      this.createProduct.emit(this.formData);
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

  onProductTypeChange(model: { value: any }): void {
    this.fetchProductBrands.emit({ typeId: model.value });
  }
}
