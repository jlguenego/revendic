import { Directive, ViewContainerRef } from '@angular/core';

// This directive is used for specifying a location in a template.
// See for instance dialog component.
// See the Dynamic Component documentation at http://angular.io

@Directive({
  selector: '[appAnchor]'
})
export class AnchorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { 
    console.log('directive appAnchor called');
  }

}
