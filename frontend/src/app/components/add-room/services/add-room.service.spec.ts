import { TestBed } from '@angular/core/testing';

import { AddRoomService } from './add-room.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddRoomService', () => {
  let service: AddRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(AddRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
