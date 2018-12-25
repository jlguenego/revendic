import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  
  constructor() { }

  ngOnInit() {
  }

  alert = window.alert;

}
