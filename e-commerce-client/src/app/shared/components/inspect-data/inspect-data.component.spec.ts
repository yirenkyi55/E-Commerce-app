import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectDataComponent } from './inspect-data.component';

describe('InspectDataComponent', () => {
  let component: InspectDataComponent;
  let fixture: ComponentFixture<InspectDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
