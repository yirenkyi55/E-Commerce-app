import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesInspectComponent } from './purchases-inspect.component';

describe('PurchasesInspectComponent', () => {
  let component: PurchasesInspectComponent;
  let fixture: ComponentFixture<PurchasesInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesInspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
