import { Component, OnInit, Input } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() label: string;
  isOpen = false;
  faCaretDown = faCaretDown;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
