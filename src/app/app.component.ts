import { Component } from '@angular/core';
import { UrlService } from './common/url.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private db: AngularFirestore, private urlService: UrlService) { }
}
