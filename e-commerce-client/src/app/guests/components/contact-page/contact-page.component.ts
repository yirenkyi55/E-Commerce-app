import { Component, OnInit } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
import { swing } from 'ng-animate';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  animations: [trigger('swing', [transition('*=>*', useAnimation(swing))])],
})
export class ContactPageComponent implements OnInit {
  swing: any;
  constructor() {}

  ngOnInit(): void {}
}
