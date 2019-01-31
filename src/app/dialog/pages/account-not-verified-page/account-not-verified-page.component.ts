import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-not-verified-page',
  templateUrl: './account-not-verified-page.component.html',
  styleUrls: ['./account-not-verified-page.component.scss']
})
export class AccountNotVerifiedPageComponent implements OnInit {

  title = 'Il faudrait que vous activiez votre compte.';

  constructor() { }

  ngOnInit() {
  }

}
