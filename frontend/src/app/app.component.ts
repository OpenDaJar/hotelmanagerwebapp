import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';
import { Subscription } from 'rxjs';
import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username!: string;

  eventBusSub?: Subscription;

  constructor(private storageService: StorageService, private authService: AuthService,private eventBusService: EventBusService){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      // this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout(true);
    });
  }

  logout($event:boolean): void {
    if($event){
      this.authService.logout().subscribe({
        next: res => {
          console.log(res);
          this.storageService.clean();

          window.location.reload();
        },
        error: err => {
          console.log(err);
        }
      });
    }

  }
}
