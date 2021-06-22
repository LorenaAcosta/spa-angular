import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosListarComponent } from './pedidos-listar.component';

describe('PedidosListarComponent', () => {
  let component: PedidosListarComponent;
  let fixture: ComponentFixture<PedidosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
