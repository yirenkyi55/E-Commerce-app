import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() btnClass = 'button button-primary';
  @Output() btnClick = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  onClick(event: Event): void {
    this.btnClick.emit(event);
  }
}
