import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInspectComponent } from './type-inspect.component';

describe('TypeInspectComponent', () => {
  let component: TypeInspectComponent;
  let fixture: ComponentFixture<TypeInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeInspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
