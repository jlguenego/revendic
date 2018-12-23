import { Injectable } from '@angular/core';

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  mobile = isMobileDevice();
  constructor() {

    window.onresize = event => {
      console.log('event', event);

    }
  }
}
