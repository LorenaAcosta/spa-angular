import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibleComponent } from './disponiblebox.component';

describe('DisponibleComponent', () => {
  let component: DisponibleComponent;
  let fixture: ComponentFixture<DisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
