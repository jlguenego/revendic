import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/common/url.service';
import { dbg } from 'src/environments/environment';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private urlService: UrlService, private user: UserService) { }

  ngOnInit() {
    const previousUrl = this.urlService.getPreviousUrl();
    dbg('previousUrl', previousUrl);
    if (this.user.url === '/') {
      this.user.url = previousUrl;
    }
    dbg('this.user.url', this.user.url);
  }

}
