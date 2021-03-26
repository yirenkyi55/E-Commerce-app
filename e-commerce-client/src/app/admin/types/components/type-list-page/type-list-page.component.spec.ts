import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeListPageComponent } from './type-list-page.component';

describe('TypeListPageComponent', () => {
  let component: TypeListPageComponent;
  let fixture: ComponentFixture<TypeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
