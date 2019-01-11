import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListRevService } from 'src/app/rev/list-rev.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {

  constructor(public list: ListRevService) { }

  ngOnInit() {
  }

}
