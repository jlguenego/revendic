import { Component, OnInit, Input } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() label: string;
  isOpen = false;
  faCaret = this.isOpen ? faCaretUp : faCaretDown;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.isOpen = true;
    this.faCaret = faCaretUp;
  }

  close() {
    this.isOpen = false;
    this.faCaret = faCaretDown;
  }

}
