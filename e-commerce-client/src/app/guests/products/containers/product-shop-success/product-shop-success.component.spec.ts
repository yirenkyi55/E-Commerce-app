import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopSuccessComponent } from './product-shop-success.component';

describe('ProductShopSuccessComponent', () => {
  let component: ProductShopSuccessComponent;
  let fixture: ComponentFixture<ProductShopSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShopSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShopSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
