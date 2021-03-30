import { Component, OnInit } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
import { swing } from 'ng-animate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services';
import * as fromAppStore from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { NotificationType } from 'src/app/core/models';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  animations: [trigger('swing', [transition('*=>*', useAnimation(swing))])],
})
export class ContactPageComponent implements OnInit {
  swing: any;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private appStore: Store<fromAppStore.ApplicationManagementState>
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onContactUs(): void {
    this.contactService.sendContact(this.contactForm.value).subscribe(
      () => {
        this.appStore.dispatch(
          fromAppStore.DisplayNotification({
            notificationType: NotificationType.success,
            title: 'Contact Us',
            message:
              'Your message has been successfully sent. We will process it soon!',
          })
        );

        this.contactForm.reset();
      },
      () => {
        this.appStore.dispatch(
          fromAppStore.DisplayNotification({
            notificationType: NotificationType.error,
            title: 'Contact Us',
            message:
              'An Error occured whiles Sending message. Please try again later.',
          })
        );
      }
    );
  }
}
