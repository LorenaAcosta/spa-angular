import { TestBed } from '@angular/core/testing';

import { ArchivosSubidosService } from './archivos-subidos.service';

describe('ArchivosSubidosService', () => {
  let service: ArchivosSubidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosSubidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
