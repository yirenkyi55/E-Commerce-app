import { Component, OnInit } from '@angular/core';
import { transition, useAnimation, trigger } from '@angular/animations';
import { swing } from 'ng-animate';
import { Observable } from 'rxjs';
import { AboutModel } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';
import { Store } from '@ngrx/store';
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
  about$: Observable<AboutModel>;

  note = {
    header: 'Our E-Commerce App',
    content: `E-commerce has helped businesses establish a wider market 
    presence by providing cheaper and more efficient distribution channels 
    for their products or services. For example, the mass retailer Target has 
    supplemented its brick-and-mortar presence with an online store that lets
     customers purchase everything from clothes to coffeemakers to toothpaste
      to action figures.`,
  };

  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}
  ngOnInit(): void {
    this.about$ = this.store.select(fromAppStore.getAbout);
  }
}
