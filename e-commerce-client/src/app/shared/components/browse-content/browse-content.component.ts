import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButtonTypes, BrowseType } from 'src/app/core/enums';
import { ActionButton, ActionButtonData, ListItem } from 'src/app/core/models';

@Component({
  selector: 'app-browse-content',
  templateUrl: './browse-content.component.html',
  styleUrls: ['./browse-content.component.scss'],
})
export class BrowseContentComponent implements OnInit {
  @Input() browseType: BrowseType = BrowseType.Table;
  type: typeof BrowseType = BrowseType;

  // Properties for tables
  @Input() tableData = [];
  @Input() tableHeaders: { key: string; label: string }[] = [];
  @Input() tableHasActionButtons = false;
  @Input() paginateTable = true;
  @Input() tableActions: ActionButton[] = [];
  @Input() tableSource: any[];
  @Input() showTableHoverIcon = true;
  @Output() tableActionClick = new EventEmitter<ActionButtonData>();
  @Output() tableRecordClick = new EventEmitter<any>();

  // Properties for list
  @Input() listData: ListItem[] = [];
  @Input() listActions: ActionButton[] = [];
  @Input() listHasActionButtons = false;
  @Output() listActionClick = new EventEmitter<ActionButtonData>();

  constructor() {}

  ngOnInit(): void {}

  onTableActionClick(model: ActionButtonData): void {
    this.tableActionClick.emit(model);
  }

  onListActionClick(model: ActionButtonData): void {
    this.listActionClick.emit(model);
  }

  onTableRecordClick(datum: any): void {
    this.tableRecordClick.emit(datum);
  }
}
