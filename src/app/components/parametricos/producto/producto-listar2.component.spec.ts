import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoListar2Component } from './producto-listar2.component';

describe('ProductoListar2Component', () => {
  let component: ProductoListar2Component;
  let fixture: ComponentFixture<ProductoListar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoListar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoListar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
