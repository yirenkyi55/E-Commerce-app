import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInspectPageComponent } from './type-inspect-page.component';

describe('TypeInspectPageComponent', () => {
  let component: TypeInspectPageComponent;
  let fixture: ComponentFixture<TypeInspectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeInspectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInspectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
