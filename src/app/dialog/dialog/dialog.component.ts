import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../dialog.service';
import { AnchorDirective } from 'src/app/widget/anchor.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @ViewChild(AnchorDirective) anchorHost: AnchorDirective;

  @Input() set init(val) {
    console.log('initializing dialog pages', val);
    this.dialog.init(val);
  }

  faTimes = faTimes;
  constructor(
    public dialog: DialogService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.dialog.register(this);
  }

  ngOnInit() {
  }

  loadComponent(component: Type<{}>): ComponentRef<{}> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.anchorHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef;
  }

}
