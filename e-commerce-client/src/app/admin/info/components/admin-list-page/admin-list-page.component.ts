import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-admin-list-page',
  templateUrl: './admin-list-page.component.html',
  styleUrls: ['./admin-list-page.component.scss'],
})
export class AdminListPageComponent implements OnInit {
  @Input() admins: User[];
  headers = [
    { key: 'firstName', label: 'First Name' },
    { key: 'otherName', label: 'Other Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
  ];

  @Output() createAdmin = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onCreateAdmin(): void {
    this.createAdmin.emit();
  }
}
