import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  message: string;
  
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(data => this.message = data.message);
  }

  ngOnInit() {
  }

}
