import { Component, Input, OnInit } from '@angular/core';
import { DashboardMenu } from 'src/app/core/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  @Input() dashboardMenus: DashboardMenu[];
  constructor() {}

  ngOnInit(): void {}
}
