import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed = false;
  @Output() collapse = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onCollapse(): void {
    this.collapse.emit(!this.isCollapsed);
  }

  onLogout(): void {
    this.logout.emit(true);
  }
}
