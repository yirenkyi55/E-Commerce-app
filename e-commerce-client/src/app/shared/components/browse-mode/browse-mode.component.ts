import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BrowseType } from 'src/app/core/enums';
import {
  ActionButton,
  ActionButtonData,
  ListItem,
  TableHeaders,
} from 'src/app/core/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-browse-mode',
  templateUrl: './browse-mode.component.html',
  styleUrls: ['./browse-mode.component.scss'],
})
export class BrowseModeComponent implements OnInit {
  // Properties for browse mode
  // Properties for  New Content Button
  @Input() disabledButton = false;
  @Output() buttonClick = new EventEmitter<number>();
  // Properties for Search Component
  @Input() searchPlaceholder = 'Enter search item';
  @Input() clearSearch = true;
  @Input() languageVisible = true;
  @Input() searchWidth = '100%';
  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSearchContent = new EventEmitter<boolean>();

  // Properties for filtering contents
  @Input() clearDisabled = false;
  @Input() filterDisabled = false;
  @Output() clearButton = new EventEmitter<boolean>();
  @Output() filterButton = new EventEmitter<boolean>();
  @Input() hasAppliedFilter: boolean;
  @Input() showCreateButton = true;

  // Properties for displaying contents
  @Input() browseType: BrowseType = BrowseType.Table;
  @Input() tableData = [];
  @Input() tableHeaders: TableHeaders[] = [];
  @Input() tableHasActionButtons = false;
  @Input() paginateTable = false;
  @Input() tableActions: ActionButton[] = [];
  @Input() tableSource: any[];
  @Input() showTableHoverIcon = true;
  @Output() tableActionClick = new EventEmitter<ActionButtonData>();
  @Output() tableRecordClick = new EventEmitter<any>();

  @Input() listData: ListItem[] = [];
  @Input() listActions: ActionButton[] = [];
  @Input() listHasActionButtons = false;
  @Output() listActionClick = new EventEmitter<ActionButtonData>();

  // Properties for Pagination
  @Input() currentPageNumber = 1;
  @Input() totalRecords = 0;
  @Input() pageSize = 10;
  @Output() pageNumberChange = new EventEmitter<number>();

  @Output() paginateOnScroll = new EventEmitter();

  //0 is default, 1 is favorites, 2 is recent
  collectionType: number = 2;
  // Properties for navigation
  @Input() navigateBackwards = true;

  @Input() showFilterButton = true;

  @ViewChild('browseContent') browseContent: ElementRef;

  constructor(private location: Location) {}

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

  onButtonClick(event: boolean): void {
    if (this.collectionType === 2) {
      this.collectionType = 0;
    } else {
      this.collectionType++;
    }
    this.buttonClick.emit(this.collectionType);
  }

  onClearButton(event: boolean): void {
    this.clearButton.emit(event);
  }

  onFilterButton(event: boolean): void {
    this.filterButton.emit(event);
  }

  onTableActionClick(model: ActionButtonData): void {
    this.tableActionClick.emit(model);
  }

  onListActionClick(model: ActionButtonData): void {
    this.listActionClick.emit(model);
  }

  onPageNumberChange(pageNumber: number): void {
    this.pageNumberChange.emit(pageNumber);
  }

  onTableRecordClick(datum: any): void {
    this.tableRecordClick.emit(datum);
  }

  onNavigateBackwards(mode: boolean): void {
    this.location.back();
  }

  onScroll(): void {
    this.paginateOnScroll.emit();
  }
  get firstIcon(): string {
    return this.collectionType === 0 ? 'arrow-down' : 'arrow-up';
  }
  get secondIcon(): string {
    return this.collectionType === 0 ? 'arrow-up' : 'arrow-down';
  }
}
