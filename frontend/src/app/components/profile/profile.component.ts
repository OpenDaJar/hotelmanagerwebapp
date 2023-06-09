import { Component } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  currentUser: any;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
