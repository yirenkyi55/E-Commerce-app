import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnChanges {
  @Input() placeholder = 'Enter search item';
  @Input() clear = true;
  @Input() width = '100%';

  searchWord = '';

  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSearchContent = new EventEmitter<boolean>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { clear } = changes;
    if (clear && clear.currentValue === true) {
      this.searchWord = '';
    }
  }

  emitSearchEvent(): void {
    if (this.searchWord) {
      this.search.emit(this.searchWord);
    } else {
      this.clearSearchContent.emit(true);
    }
  }
  ngOnInit(): void {}

  onSearchChange(searchValue: string): void {
    this.searchChange.emit(searchValue);
  }

  emitClearEvent(): void {
    this.clearSearchContent.emit(true);
  }
}
