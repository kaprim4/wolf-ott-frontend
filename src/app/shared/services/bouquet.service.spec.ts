import { TestBed } from '@angular/core/testing';

import { BouquetService } from './bouquet.service';

describe('BouquetService', () => {
  let service: BouquetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouquetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
