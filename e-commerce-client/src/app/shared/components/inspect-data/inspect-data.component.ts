import { Component, Input, OnInit } from '@angular/core';
import { InspectModeContent } from 'src/app/core/models';

@Component({
  selector: 'app-inspect-data',
  templateUrl: './inspect-data.component.html',
  styleUrls: ['./inspect-data.component.scss'],
})
export class InspectDataComponent implements OnInit {
  @Input() content: InspectModeContent;
  constructor() {}

  ngOnInit(): void {}
}
