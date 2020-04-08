import { TestBed } from '@angular/core/testing';

import { PvgfpService } from './pvgfp.service';

describe('PvgfpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PvgfpService = TestBed.get(PvgfpService);
    expect(service).toBeTruthy();
  });
});
