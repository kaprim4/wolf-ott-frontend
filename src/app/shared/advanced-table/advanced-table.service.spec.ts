import { TestBed } from '@angular/core/testing';

import { AdvancedTableService } from './advanced-table.service';

describe('AdvancedTableService', () => {
  let service: AdvancedTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
