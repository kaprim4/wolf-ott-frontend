import { TestBed } from '@angular/core/testing';

import { MagService } from './mag.service';

describe('MagService', () => {
  let service: MagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
