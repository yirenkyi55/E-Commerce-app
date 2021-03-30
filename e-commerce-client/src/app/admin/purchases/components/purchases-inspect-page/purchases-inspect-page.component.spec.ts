import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesInspectPageComponent } from './purchases-inspect-page.component';

describe('PurchasesInspectPageComponent', () => {
  let component: PurchasesInspectPageComponent;
  let fixture: ComponentFixture<PurchasesInspectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesInspectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesInspectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
