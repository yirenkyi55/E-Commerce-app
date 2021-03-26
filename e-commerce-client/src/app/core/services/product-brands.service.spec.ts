import { TestBed } from '@angular/core/testing';

import { ProductBrandsService } from './product-brands.service';

describe('ProductBrandsService', () => {
  let service: ProductBrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
