import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  email: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(data => this.email = data.email);
  }

  ngOnInit() {
  }

}
