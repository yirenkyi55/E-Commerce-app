import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButtonTypes } from 'src/app/core/enums';
import {
  ActionButton,
  ActionButtonData,
  TableHeaders,
} from 'src/app/core/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data = [];
  @Input() headers: TableHeaders[] = [];
  @Input() action = false;
  @Input() paginateTable = true;
  @Input() actions: ActionButton[] = [];
  @Input() source: any[];
  @Input() showTableHoverIcon = true;

  @Output() actionClick = new EventEmitter<ActionButtonData>();
  @Output() recordClick = new EventEmitter<any>();

  constructor() {}

  onActionClick(event: MouseEvent, id: string, type: ActionButtonTypes): void {
    event?.stopPropagation();
    this.actionClick.emit({ id, type });
  }

  onDisabled(
    disabled: (id: string, source: any[]) => boolean,
    id: string
  ): boolean {
    return disabled(id, this.source);
  }

  onClickRecord(datum: any): void {
    this.recordClick.emit(datum);
  }

  ngOnInit(): void {}
}
