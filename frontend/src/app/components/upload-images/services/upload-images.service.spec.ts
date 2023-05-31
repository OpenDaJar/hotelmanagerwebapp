import { TestBed } from '@angular/core/testing';

import { UploadImagesService } from './upload-images.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UploadImagesService', () => {
  const API_URL = 'http://localhost:6868/api/files';
  let service: UploadImagesService;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UploadImagesService]
    });
    service = TestBed.inject(UploadImagesService);
    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should upload image API',()=>{
    let testFile!:File
    const testMsg = {message: `Uploaded the file successfully:`}

    service.upload(testFile).subscribe((data)=>{
      expect(data).toBeTruthy()
    })
    const req = httpTestingController.expectOne(
      API_URL + '/upload'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testMsg);
    httpTestingController.verify();
  })
});
