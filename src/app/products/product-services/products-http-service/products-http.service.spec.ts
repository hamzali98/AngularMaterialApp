/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductsHttpService } from './products-http.service';

describe('Service: ProductsHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsHttpService]
    });
  });

  it('should ...', inject([ProductsHttpService], (service: ProductsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
