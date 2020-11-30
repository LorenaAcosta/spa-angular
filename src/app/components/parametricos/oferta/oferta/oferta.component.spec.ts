import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaComponent } from './oferta.component';

describe('OfertaComponent', () => {
  let component: OfertaComponent;
  let fixture: ComponentFixture<OfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
