import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaComponent } from './planilla.component';

describe('PlanillaComponent', () => {
  let component: PlanillaComponent;
  let fixture: ComponentFixture<PlanillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
