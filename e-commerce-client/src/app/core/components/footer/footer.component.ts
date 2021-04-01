import { Component, Input, OnInit } from '@angular/core';
import { AboutModel } from '../../models';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  @Input() about: AboutModel;
  ngOnInit(): void {}
}
