import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss'],
})
export class EditModeComponent implements OnInit {
  constructor(private location: Location) {}
  @Input() resetButtonText = 'Reset';
  @Input() resetButtonVisible = true;
  @Input() resetButtonDisabled = false;

  @Input() saveButtonText = 'Save';
  @Input() saveButtonVisible = true;
  @Input() saveButtonDisabled = false;
  @Input() saveButtonLoading = false;

  @Input() backButtonVisible = true;

  @Output() resetClick = new EventEmitter<boolean>();
  @Output() saveClick = new EventEmitter<boolean>();

  ngOnInit(): void {}

  onNavigateBackwards(mode: boolean): void {
    this.location.back();
  }

  onResetButtonClick(mode: boolean): void {
    this.resetClick.emit(true);
  }

  onSaveButtonClick(mode: boolean): void {
    this.saveClick.emit(true);
  }
}
