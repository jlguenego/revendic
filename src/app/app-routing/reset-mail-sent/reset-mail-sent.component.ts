import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-mail-sent',
  templateUrl: './reset-mail-sent.component.html',
  styleUrls: ['./reset-mail-sent.component.scss']
})
export class ResetMailSentComponent implements OnInit {

  email: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(data => this.email = data.email);
  }

  ngOnInit() {
  }

}
