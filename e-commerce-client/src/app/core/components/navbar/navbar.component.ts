import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScrollEvent } from 'ngx-scroll-event';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('topBottom', [
      state(
        'top',
        style({
          backgroundColor: 'transparent',
          borderBottom: '2px solid transparent',
        })
      ),
      state(
        'bottom',
        style({
          backgroundColor: '#10182f',
          borderBottom: '2px solid #d5e5b5',
        })
      ),

      transition('*=>top', animate('0.5s 0s ease-out')),
      transition('*=>bottom', animate('0.3s 0s ease-in')),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  isTop = true;
  @Output() login = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleScroll(event: ScrollEvent): void {
    if (event.isReachingBottom && !event.isReachingTop) {
      this.isTop = false;
    }

    if (event.isReachingTop) {
      this.isTop = true;
    }
  }

  onLogin(): void {
    this.login.emit(true);
  }
}