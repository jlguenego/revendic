import { Injectable, ChangeDetectorRef } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { timer } from 'rxjs';

export interface PageComponent {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  component: DialogComponent;

  isVisible = false;

  pages;
  currentPage;

  title: string = "xxx";

  constructor() { }

  register(c: DialogComponent) {
    this.component = c;
  }

  init(pages) {
    console.log('init page', pages);
    this.pages = pages;
  }

  show(page: string, data = {}) {
    this.isVisible = true;
    this.component.cd.markForCheck();
    timer(2000).subscribe(() => {
      this.currentPage = this.pages[page];
      const componentRef = this.component.loadComponent(this.currentPage);
      this.title = (<PageComponent>componentRef.instance).title;
    });

  }

  close() {
    this.isVisible = false;
  }


}
