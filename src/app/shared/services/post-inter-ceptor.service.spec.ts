import { TestBed } from '@angular/core/testing';

import { PostInterceptorService } from './post-inter-ceptor.service';

describe('PostInterSeptorService', () => {
  let service: PostInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
