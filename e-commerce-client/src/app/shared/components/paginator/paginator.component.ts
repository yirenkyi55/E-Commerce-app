import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() pageNumber = 1;
  @Input() totalPages = 20;
  @Input() pageSize = 10;

  @Output() pageNumberChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  pageIndexChange(pageIndex: number): void {
    this.pageNumberChange.emit(pageIndex);
  }
}
