import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartItemComponent } from './product-cart-item.component';

describe('ProductCartItemComponent', () => {
  let component: ProductCartItemComponent;
  let fixture: ComponentFixture<ProductCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCartItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
