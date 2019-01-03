import { Component, OnInit } from '@angular/core';
import { UserRoutes } from '../../user-routes';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-account-not-activated',
  templateUrl: './account-not-activated.component.html',
  styleUrls: ['./account-not-activated.component.scss']
})
export class AccountNotActivatedComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
