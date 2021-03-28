import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseHeaderComponent } from './browse-header.component';

describe('BrowseHeaderComponent', () => {
  let component: BrowseHeaderComponent;
  let fixture: ComponentFixture<BrowseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
