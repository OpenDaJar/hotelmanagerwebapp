import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  private roles: string[] = [];
  @Input()
  username!:string;

  @Input()
  isLoggedIn!:boolean

  @Output()
  logOutEvent = new EventEmitter<boolean>

  ngOnInit(): void {

  }

  btnLogout(){
    this.logOutEvent.emit(true)
  }
}
