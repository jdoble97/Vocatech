import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css']
})
export class NavbarDesktopComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logout():void{
    this.userService.logoutUser();
  }

}
