import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteComponent } from './comprobante.component';

describe('ComprobanteComponent', () => {
  let component: ComprobanteComponent;
  let fixture: ComponentFixture<ComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
