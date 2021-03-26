import { ActionButtonTypes } from 'src/app/core/enums';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton, ActionButtonData, ListItem } from 'src/app/core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() data: ListItem[] = [];
  @Input() actions: ActionButton[] = [];
  @Input() action = false;

  @Output() actionClick = new EventEmitter<ActionButtonData>();

  constructor() {}

  ngOnInit(): void {}

  onActionButtonClick(id: string, type: ActionButtonTypes): void {
    this.actionClick.emit({ id, type });
  }
}
