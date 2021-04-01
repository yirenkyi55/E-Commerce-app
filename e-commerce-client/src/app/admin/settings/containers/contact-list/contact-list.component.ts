import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/core/models';
import * as fromStore from 'src/app/core/store';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [TitleCasePipe],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contactsSubscription: Subscription;

  constructor(
    private store: Store<fromStore.ApplicationManagementState>,
    private titleCase: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.contactsSubscription = this.store
      .select(fromStore.getContacts)
      .subscribe({
        next: (response) => {
          this.contacts = response.map((cont) => ({
            id: cont.id,
            email: cont.email,
            name: this.titleCase.transform(cont.name),
            message: cont.message,
          }));
        },
      });
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
