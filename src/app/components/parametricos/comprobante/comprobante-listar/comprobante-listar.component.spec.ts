import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteListarComponent } from './comprobante-listar.component';

describe('ComprobanteListarComponent', () => {
  let component: ComprobanteListarComponent;
  let fixture: ComponentFixture<ComprobanteListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
