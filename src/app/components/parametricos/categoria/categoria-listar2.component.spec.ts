import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListar2Component } from './categoria-listar2.component';

describe('CategoriaListar2Component', () => {
  let component: CategoriaListar2Component;
  let fixture: ComponentFixture<CategoriaListar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaListar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
