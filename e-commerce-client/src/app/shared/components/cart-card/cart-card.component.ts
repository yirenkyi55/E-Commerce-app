import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss'],
})
export class CartCardComponent implements OnInit {
  @Input() cartHeaderLeft: string;
  @Input() cartHeaderRight: string;
  @Input() showEmptyContainer: boolean;

  constructor() {}

  ngOnInit(): void {}
}
