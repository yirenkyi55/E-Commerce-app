import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() visible = false;
  @Output() cancelled = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onCancelled(event: boolean): void {
    this.cancelled.emit(event);
  }
}
