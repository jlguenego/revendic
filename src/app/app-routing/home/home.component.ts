import { Component, OnInit } from '@angular/core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faYoutube = faYoutube;

  constructor() { }

  ngOnInit() {
  }

}
