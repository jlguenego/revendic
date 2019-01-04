import { Injectable, ChangeDetectorRef } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { timer } from 'rxjs';
import { NeedAccountDialogPageComponent } from './pages/need-account-dialog-page/need-account-dialog-page.component';

export interface PageComponent {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  component: DialogComponent;

  pages;
  currentPage;

  constructor() { }

  register(c: DialogComponent) {
    this.component = c;
  }

  init(pages) {
    console.log('init page', pages);
    this.pages = pages;
  }

  show(page: string, data = {}) {
    this.component.isVisible = true;
    // needs digestion of isVisible. so we use the timer.
    timer(0).subscribe(() => {
      this.currentPage = this.pages[page];
      const componentRef = this.component.loadComponent(this.currentPage);
      console.log('componentRef', componentRef);
      const pageComponent = (<PageComponent>componentRef.instance);
      this.component.title = pageComponent.title;
    });

  }

  close() {
    this.component.isVisible = false;
  }


}
