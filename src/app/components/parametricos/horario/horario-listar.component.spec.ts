import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioListarComponent } from './horario-listar.component';

describe('HorarioListarComponent', () => {
  let component: HorarioListarComponent;
  let fixture: ComponentFixture<HorarioListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
