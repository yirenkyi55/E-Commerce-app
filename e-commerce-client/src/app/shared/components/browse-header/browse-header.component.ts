import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrowseType } from 'src/app/core/enums';
import {
  TableHeaders,
  ActionButton,
  ActionButtonData,
} from 'src/app/core/models';

@Component({
  selector: 'app-browse-header',
  templateUrl: './browse-header.component.html',
  styleUrls: ['./browse-header.component.scss'],
})
export class BrowseHeaderComponent implements OnInit {
  @Input() searchPlaceholder = 'Enter search item';
  @Input() clearSearch = true;
  @Input() languageVisible = true;
  @Input() searchWidth = '100%';
  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSearchContent = new EventEmitter<boolean>();

  @Input() clearDisabled = false;
  @Input() filterDisabled = false;
  @Output() clearButton = new EventEmitter<boolean>();
  @Output() filterButton = new EventEmitter<boolean>();
  @Input() hasAppliedFilter: boolean;
  @Input() showCreateButton = true;
  @Input() showFilterButton = true;
  @Input() disabledButton = false;

  @Output() buttonClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSearch(item: string): void {
    this.search.emit(item);
  }

  onSearchChange(item: string): void {
    this.searchChange.emit(item);
  }

  onClearSearchContent(clear: boolean): void {
    this.clearSearchContent.emit(clear);
  }

  onClearButton(event: boolean): void {
    this.clearButton.emit(event);
  }

  onFilterButton(event: boolean): void {
    this.filterButton.emit(event);
  }

  onButtonClick(event: boolean): void {
    this.buttonClick.emit();
  }
}
