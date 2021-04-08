import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComprobanteComponent } from './tipo-comprobante.component';

describe('TipoComprobanteComponent', () => {
  let component: TipoComprobanteComponent;
  let fixture: ComponentFixture<TipoComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
