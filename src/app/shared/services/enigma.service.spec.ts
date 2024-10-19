import { TestBed } from '@angular/core/testing';

import { EnigmaService } from './enigma.service';

describe('EnigmaService', () => {
  let service: EnigmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnigmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
