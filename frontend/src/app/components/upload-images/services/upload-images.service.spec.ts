import { TestBed } from '@angular/core/testing';

import { UploadImagesService } from './upload-images.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadImagesService', () => {
  let service: UploadImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(UploadImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
