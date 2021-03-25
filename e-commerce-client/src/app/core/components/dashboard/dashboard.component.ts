import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardMenu } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  @Input() dashboardMenus: DashboardMenu[];

  @Output() logout = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onCollapse(collapse: boolean): void {
    this.isCollapsed = collapse;
  }

  onLogout(): void {
    this.logout.emit(true);
  }
}
