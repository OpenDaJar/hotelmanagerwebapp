import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadImagesService } from './services/upload-images.service';
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  @Input('roomName') picName!: string;
  @Output() picURLEvent = new EventEmitter<string>();

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private uploadService: UploadImagesService) {}

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      const renamedFile = new File([file], `room-` + this.picName);
      file = renamedFile;
      this.picURLEvent.emit(file.name);
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = file.name + ': Successful!';
            this.message.push(msg);
            // this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          let msg = file.name + ': Failed!';

          if (err.error && err.error.message) {
            msg += ' ' + err.error.message;
          }

          this.message.push(msg);
        }
      );
    }
  }
}
