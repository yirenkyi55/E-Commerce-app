import { CreateProductTypeModel, ProductType } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-type-create-page',
  templateUrl: './type-create-page.component.html',
  styleUrls: ['./type-create-page.component.scss'],
})
export class TypeCreatePageComponent implements OnInit, OnChanges {
  typeForm: FormGroup;
  @Input() productType: ProductType;
  @Input() loading: boolean;
  @Output() createProductType = new EventEmitter<CreateProductTypeModel>();
  @Output() updateProductType = new EventEmitter<{
    id: string;
    model: CreateProductTypeModel;
  }>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { loading, productType } = changes;

    if (
      loading &&
      loading.previousValue &&
      !loading.currentValue &&
      !this.productType
    ) {
      // We Reset the form if saving was successful
      this.resetForm();
    }

    if (productType && productType.currentValue) {
      if (!this.typeForm) {
        this.createForm();
      }
      this.typeForm.setValue({
        name: this.productType.name,
      });
    }
  }

  get saveButtonText(): string {
    return this.productType ? 'Update Type' : 'Create Type';
  }

  get titleText(): string {
    return this.productType ? 'Update Product Type' : 'Create New Product Type';
  }

  resetForm(): void {
    this.typeForm.reset();
  }

  createForm(): void {
    this.typeForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onFormSubmit(): void {
    if (!this.productType) {
      this.createProductType.emit(this.typeForm.value);
    } else {
      this.updateProductType.emit({
        id: this.productType.id,
        model: this.typeForm.value,
      });
    }
  }
  ngOnInit(): void {}
}
