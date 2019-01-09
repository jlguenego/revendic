import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { timer } from 'rxjs';
import { dbg } from 'src/environments/environment';

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
    this.pages = pages;
  }

  show(page: string) {
    this.component.isVisible = true;
    // needs digestion of isVisible. so we use the timer.
    timer(0).subscribe(() => {
      this.currentPage = this.pages[page];
      const componentRef = this.component.loadComponent(this.currentPage);
      const pageComponent = (<PageComponent>componentRef.instance);
      this.component.title = pageComponent.title;
    });

  }

  close() {
    this.component.isVisible = false;
  }


}
