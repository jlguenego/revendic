import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }

  share(url) {
    const myUrl = encodeURI(url);
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${myUrl}&amp;src=sdkpreparse`;
    window.open(fbUrl, 'Facebook', 'width=556,height=618');
  }
}
