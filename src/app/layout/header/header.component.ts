import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { ResponsiveService } from '../responsive.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(window:focus)': 'refresh($event)',
  }
})
export class HeaderComponent implements OnInit {

  faBars = faBars;
  isMenuOpen = false;

  constructor(public resp: ResponsiveService, public user: UserService) { }

  ngOnInit() {
  }

  openMenu() {
    this.isMenuOpen = true;
    this.manageBody();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.manageBody();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.manageBody();
  }

  refresh() {
    this.user.refresh();
  }

  manageBody() {
    if (this.isMenuOpen && window) {
      window.document.body.style.position = 'fixed';
    } else {
      window.document.body.style.position = 'relative';
    }
  }

}
