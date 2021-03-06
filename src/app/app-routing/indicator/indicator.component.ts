import { Component, OnInit } from '@angular/core';
import { ListRevService } from 'src/app/rev/list-rev.service';
import { StatService } from 'src/app/stat/stat.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {

  constructor(public list: ListRevService, public stat: StatService) { }

  ngOnInit() {
  }

}
