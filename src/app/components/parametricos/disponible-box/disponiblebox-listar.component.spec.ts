import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBoxComponent } from './disponiblebox-listar.component';

describe('ListarComponent', () => {
  let component: ListarBoxComponent;
  let fixture: ComponentFixture<ListarBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});