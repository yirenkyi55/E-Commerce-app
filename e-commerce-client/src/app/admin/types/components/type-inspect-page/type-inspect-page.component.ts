import { TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  InspectModeContent,
  ProductType,
  CreateProductBrandModel,
  ProductBrand,
} from 'src/app/core/models';

@Component({
  selector: 'app-type-inspect-page',
  templateUrl: './type-inspect-page.component.html',
  styleUrls: ['./type-inspect-page.component.scss'],
  providers: [TitleCasePipe],
})
export class TypeInspectPageComponent implements OnInit, OnChanges {
  @Input() productType: ProductType;
  @Input() loading: boolean;
  @Input() productBrands: ProductBrand[];
  brandToEdit: ProductBrand;

  @Output() saveBrand = new EventEmitter<{
    typeId: string;
    brand: CreateProductBrandModel;
  }>();

  @Output() updateBrand = new EventEmitter<{
    typeId: string;
    brandId: string;
    brand: CreateProductBrandModel;
  }>();

  @Output() editType = new EventEmitter<ProductType>();

  listContentType: InspectModeContent[];
  brandsForm: FormGroup;

  constructor(private titleCase: TitleCasePipe, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { productType, loading } = changes;

    if (productType && productType.currentValue) {
      this.listContentType = [
        {
          title: 'Product Type',
          isMultiple: false,
          text: this.titleCase.transform(this.productType.name),
        },
      ];
    }

    if (loading && loading.previousValue && !loading.currentValue) {
      // We Reset the form if saving was successful
      this.resetForm();
    }
  }

  get saveText(): string {
    return this.brandToEdit ? 'Update' : 'Save';
  }

  createForm(): void {
    this.brandsForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  resetForm(): void {
    this.brandsForm.reset();
    this.brandToEdit = null;
  }
  saveBrands(): void {
    if (this.brandToEdit) {
      this.updateBrand.emit({
        typeId: this.productType.id,
        brandId: this.brandToEdit.id,
        brand: this.brandsForm.value,
      });
    } else {
      this.saveBrand.emit({
        typeId: this.productType.id,
        brand: this.brandsForm.value,
      });
    }
  }

  onEditBrand(brand: ProductBrand): void {
    this.brandToEdit = brand;
    this.brandsForm.setValue({
      name: brand.name,
    });
  }

  onEditType(): void {
    this.editType.emit(this.productType);
  }
}
