import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {

    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser)
  }

  noUser():boolean{
    if (Object.keys(this.currentUser).length===0){
      return true
    }
    return false
  }
}
