import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveService } from '../responsive.service';
import { UserService } from 'src/app/libuser/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;
  isMenuOpen = false;
  
  constructor(public resp: ResponsiveService, public user: UserService, private cd: ChangeDetectorRef) { 
    window.addEventListener("focus", event => this.refresh(), false);
  }

  ngOnInit() {
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  refresh() {
    console.log('refresh');
    this.user.refresh();
  }



}
