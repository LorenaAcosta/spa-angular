import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoServicioComponent } from './empleado-servicio.component';

describe('EmpleadoServicioComponent', () => {
  let component: EmpleadoServicioComponent;
  let fixture: ComponentFixture<EmpleadoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
