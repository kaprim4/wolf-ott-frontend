import { TestBed } from '@angular/core/testing';

import { LineActivityService } from './line-activity.service';

describe('LineActivityService', () => {
  let service: LineActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
