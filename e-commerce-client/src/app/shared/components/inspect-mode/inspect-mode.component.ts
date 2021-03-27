import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InspectItem, InspectModeContent } from 'src/app/core/models';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inspect-mode',
  templateUrl: './inspect-mode.component.html',
  styleUrls: ['./inspect-mode.component.scss'],
})
export class InspectModeComponent implements OnInit {
  @Input() data: InspectItem[] = [];
  @Input() inspectData: InspectModeContent[] = [];

  @Output() editContent = new EventEmitter<boolean>();
  @Output() customButtonClicked = new EventEmitter<boolean>();
  @Output() extraCustomButtonClicked = new EventEmitter<boolean>();
  @Output() deleteContent = new EventEmitter<boolean>();
  @Input() navigateByEvent = false;
  @Input() customButtonVisible = false;
  @Input() extraCustomButtonVisible = false;
  @Input() customButtonText = 'Order';
  @Input() customIcon = 'swap';
  @Input() extraCustomButtonText = 'Extra';
  @Input() extraCustomIcon = 'swap';
  @Input() editButtonText = 'Edit';
  @Input() editIcon = 'edit';
  @Input() clientMode = false;
  @Output() navigateBackwards = new EventEmitter<boolean>();

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onNavigateBackwards(mode: boolean): void {
    if (this.navigateByEvent) {
      this.navigateBackwards.emit(mode);
    } else {
      this.location.back();
    }
  }

  onEditContent(mode: boolean): void {
    this.editContent.emit(mode);
  }

  onOrderContent(mode: boolean): void {
    this.customButtonClicked.emit(mode);
  }
  onExtraCustumClick(mode: boolean): void {
    this.extraCustomButtonClicked.emit(mode);
  }

  onDeleteContent(mode: boolean): void {
    this.deleteContent.emit(true);
  }
}
