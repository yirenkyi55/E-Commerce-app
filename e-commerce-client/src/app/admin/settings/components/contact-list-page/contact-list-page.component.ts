import { Component, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/core/models';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.scss'],
})
export class ContactListPageComponent implements OnInit {
  @Input() contacts: Contact[];
  headers = [
    { key: 'name', label: 'Contact Person Name' },
    { key: 'email', label: 'Contact Email Address' },
    { key: 'message', label: 'Contact Message' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
