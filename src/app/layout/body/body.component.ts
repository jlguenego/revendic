import { Component, OnInit } from '@angular/core';
import { DialogPages } from 'src/app/dialog/dialog-pages';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pages = DialogPages.pages;

}
