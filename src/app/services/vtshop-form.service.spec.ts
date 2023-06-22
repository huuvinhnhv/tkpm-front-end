import { TestBed } from '@angular/core/testing';

import { VTShopFormService } from './vtshop-form.service';

describe('vtshopFormService', () => {
  let service: VTShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VTShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
