import { Component, OnInit } from '@angular/core';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  faGoogle = faGoogle;
  faFacebook = faFacebook;

  constructor() { }

  ngOnInit() {
  }

}
