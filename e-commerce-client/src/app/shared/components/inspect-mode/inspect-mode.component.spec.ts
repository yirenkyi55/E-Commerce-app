import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectModeComponent } from './inspect-mode.component';

describe('InspectModeComponent', () => {
  let component: InspectModeComponent;
  let fixture: ComponentFixture<InspectModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
