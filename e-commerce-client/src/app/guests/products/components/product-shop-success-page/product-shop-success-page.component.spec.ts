import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopSuccessPageComponent } from './product-shop-success-page.component';

describe('ProductShopSuccessPageComponent', () => {
  let component: ProductShopSuccessPageComponent;
  let fixture: ComponentFixture<ProductShopSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShopSuccessPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShopSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
