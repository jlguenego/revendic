import { Injectable } from '@angular/core';
import { dbg } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
