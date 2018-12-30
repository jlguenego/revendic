import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor(public test: TestService) {}

  isListening = false;

  ngOnInit() {}

  start() {
    this.isListening = true;
  }
  stop() {
    this.isListening = false;
  }
}
