import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosSubidosComponent } from './archivos-subidos.component';

describe('ArchivosSubidosComponent', () => {
  let component: ArchivosSubidosComponent;
  let fixture: ComponentFixture<ArchivosSubidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosSubidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosSubidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
