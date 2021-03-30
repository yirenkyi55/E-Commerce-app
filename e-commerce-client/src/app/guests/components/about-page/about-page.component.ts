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
      content: `E-commerce has helped businesses establish a wider market 
      presence by providing cheaper and more efficient distribution channels 
      for their products or services. For example, the mass retailer Target has 
      supplemented its brick-and-mortar presence with an online store that lets
       customers purchase everything from clothes to coffeemakers to toothpaste
        to action figures.`,
    },
  ];

  ngOnInit(): void {}
}
