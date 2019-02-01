import { Component } from '@angular/core';
import { UrlService } from './common/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private urlService: UrlService) { }

}
