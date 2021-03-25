import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseModeComponent } from './browse-mode.component';

describe('BrowseModeComponent', () => {
  let component: BrowseModeComponent;
  let fixture: ComponentFixture<BrowseModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
