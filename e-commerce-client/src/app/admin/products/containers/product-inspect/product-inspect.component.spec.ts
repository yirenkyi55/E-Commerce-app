import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInspectComponent } from './product-inspect.component';

describe('ProductInspectComponent', () => {
  let component: ProductInspectComponent;
  let fixture: ComponentFixture<ProductInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
