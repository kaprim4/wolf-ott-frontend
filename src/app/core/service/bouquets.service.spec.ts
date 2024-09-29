import { TestBed } from '@angular/core/testing';

import { BouquetsService } from './bouquets.service';

describe('BouquetsService', () => {
  let service: BouquetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouquetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
