import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-is-loading',
  templateUrl: './is-loading.component.html',
  styleUrls: ['./is-loading.component.scss']
})
export class IsLoadingComponent implements OnInit {

  startFadingOut = false;
  enabled = true;

  constructor(public user: UserService) { }

  ngOnInit() {
    const subscription = this.user.subject.subscribe(v => {
      if (v !== null) {
        this.startFadingOut = true;
        timer(1000).subscribe(v => this.enabled = false);
        subscription.unsubscribe();
      }
    });
  }

}
