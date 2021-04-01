import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AboutModel, CreateAboutModel } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  about$: Observable<AboutModel>;
  constructor(private store: Store<fromAppStore.ApplicationManagementState>) {}

  ngOnInit(): void {
    this.about$ = this.store.select(fromAppStore.getAbout);
  }

  onCreateAbout(aboutModel: CreateAboutModel): void {
    this.store.dispatch(fromAppStore.CreateAboutRequest(aboutModel));
  }
}
