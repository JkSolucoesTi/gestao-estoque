import { TestBed } from '@angular/core/testing';

import { RamoAtividadeService } from './ramo-atividade.service';

describe('RamoAtividadeService', () => {
  let service: RamoAtividadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamoAtividadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
