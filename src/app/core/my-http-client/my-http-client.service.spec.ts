import { TestBed } from '@angular/core/testing';

import { MyHttpClientService } from './my-http-client.service';

describe('MyHttpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyHttpClientService = TestBed.get(MyHttpClientService);
    expect(service).toBeTruthy();
  });
});
