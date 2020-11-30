import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioComponent } from './horario-asignar.component';

describe('HorarioComponent', () => {
  let component: HorarioComponent;
  let fixture: ComponentFixture<HorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
