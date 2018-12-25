import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  
  constructor(private user: UserService) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.user.loginWithGoogle();
  }
  loginWithFacebook() {
    this.user.loginWithFacebook();
  }

}
