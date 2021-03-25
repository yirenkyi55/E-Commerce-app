import { Component, OnInit } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
import { swing } from 'ng-animate';
@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  animations: [
    trigger('bounceInDown', [transition('*=>*', useAnimation(swing))]),
  ],
})
export class AboutPageComponent implements OnInit {
  bounceInDown: any;

  contentNotes = [
    {
      header: 'Our E-Commerce App',
      content: `WE@ is a teaching and learning platform that
      allows storage of learning materials such as screen-cam video’s,
      Computer Based Training components, Business Simulations, Games,
      Texts, Slides, process schemes or -models, role-based training
      schedules etc well as providing such contents to users in a friendly
      manner. (Powered by Exalio)`,
    },
  ];

  ngOnInit(): void {}
}
