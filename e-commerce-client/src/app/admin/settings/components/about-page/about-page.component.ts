import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutModel, CreateAboutModel } from 'src/app/core/models';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  aboutForm: FormGroup;
  @Input() about: AboutModel;

  @Output() createAbout = new EventEmitter<CreateAboutModel>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();

    if (this.about) {
      this.aboutForm.patchValue({
        nameOfCompany: this.about?.nameOfCompany,
        aboutTitle: this.about?.aboutTitle,
        aboutMessage: this.about?.aboutMessage,
      });
    }
  }

  createForm(): void {
    this.aboutForm = this.fb.group({
      nameOfCompany: ['', [Validators.required]],
      aboutTitle: ['', [Validators.required]],
      aboutMessage: ['', [Validators.required]],
    });
  }

  onSaveAbout(): void {
    this.createAbout.emit(this.aboutForm.value);
  }
}
