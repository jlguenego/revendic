import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private _counter = interval(200);

  counter = new Subject<number>();
  subscription: Subscription;
  isStarted = false;

  constructor() { }

  start() {
    this.subscription = this._counter.subscribe(this.counter);
    this.isStarted = true;
  }

  stop() {
    this.subscription.unsubscribe();
    this.isStarted = false;
  }

}
