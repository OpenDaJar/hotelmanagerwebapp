import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-board-mod',
  templateUrl: './board-mod.component.html',
  styleUrls: ['./board-mod.component.scss']
})
export class BoardModComponent implements OnInit{
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }
}
