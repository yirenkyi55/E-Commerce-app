import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() visible = false; // Visibility status for the modal to toggle its appearance
  @Input() title = 'Modal Title'; // The text to show on the modal
  @Input() okText = 'Ok'; // An ok text to show on the modal
  @Input() cancelText = 'Cancel'; // A cancelled text to show on the modal
  @Input() okDisabled = false; // Indicates whether to disabled the ok button or not
  @Input() cancelDisabled = false; // Indicates whether to disabled the cancel button or not
  @Input() width: number | string;
  @Input() okLoading = false;

  @Output() ok = new EventEmitter<boolean>();
  @Output() cancelled = new EventEmitter<boolean>();

  constructor() {}

  handleOk(): void {
    this.ok.emit(true);
  }

  handleCancel(): void {
    this.cancelled.emit(true);
  }

  ngOnInit(): void {}
}
