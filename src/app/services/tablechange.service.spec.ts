import { TestBed } from '@angular/core/testing';

import { TablechangeService } from './tablechange.service';

describe('TablechangeService', () => {
  let service: TablechangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablechangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
