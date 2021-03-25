import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInspectPageComponent } from './product-inspect-page.component';

describe('ProductInspectPageComponent', () => {
  let component: ProductInspectPageComponent;
  let fixture: ComponentFixture<ProductInspectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInspectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInspectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
