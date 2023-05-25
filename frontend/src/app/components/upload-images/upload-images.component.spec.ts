import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagesComponent } from './upload-images.component';
import { UploadImagesService } from './services/upload-images.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UploadImagesComponent', () => {
  let component: UploadImagesComponent;
  let fixture: ComponentFixture<UploadImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImagesComponent ],
      providers:[{provide:UploadImagesService, useValue:{}}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
