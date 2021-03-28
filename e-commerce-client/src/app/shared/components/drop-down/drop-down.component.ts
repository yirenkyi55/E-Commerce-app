import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Self,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DropDownOptions } from 'src/app/core/models';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  @Input() options: DropDownOptions[];
  @Input() formControlName: string | number;

  ngOnInit(): void {}

  constructor() {}

  onDropDownchange(event: any): void {
    console.log(event);
  }
}
