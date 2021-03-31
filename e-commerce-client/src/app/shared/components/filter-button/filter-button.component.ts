import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {
  visible = false;

  @Input() clearDisabled = false;
  @Input() filterDisabled = false;
  @Input() hasAppliedFilter = false;
  @Input() filterActive = false;

  @Output() clearButton = new EventEmitter<boolean>();
  @Output() filterButton = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    // console.log(value);
  }

  onClearButton(): void {
    this.clearButton.emit(true);
  }

  onFilterButton(): void {
    this.filterButton.emit(true);
  }
}
