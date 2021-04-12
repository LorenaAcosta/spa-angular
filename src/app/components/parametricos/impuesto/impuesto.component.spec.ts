import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestoComponent } from './impuesto.component';

describe('ImpuestoComponent', () => {
  let component: ImpuestoComponent;
  let fixture: ComponentFixture<ImpuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
