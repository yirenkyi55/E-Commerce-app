import { CreateProductTypeModel } from 'src/app/core/models';
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
  @Input() loading: boolean;
  @Input() createMode = true;
  @Output() createProductType = new EventEmitter<CreateProductTypeModel>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { loading } = changes;
    console.log(loading);
    if (
      loading &&
      loading.previousValue &&
      !loading.currentValue &&
      this.createMode
    ) {
      // We Reset the form if saving was successful
      this.resetForm();
    }
  }

  get saveButtonText(): string {
    return this.createMode ? 'Create Type' : 'Update Type';
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
    this.createProductType.emit(this.typeForm.value);
  }
  ngOnInit(): void {}
}
