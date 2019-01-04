import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

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

  show(page: string, data: {}) {
    console.log('show');
    this.currentPage = this.pages[page];
    console.log('currentPage', this.currentPage);
    const componentRef = this.component.loadComponent(this.currentPage);
    // <PageComponent>componentRef.instance.title
    this.isVisible = true;

  }

  close() {
    this.isVisible = false;
  }

  
}
