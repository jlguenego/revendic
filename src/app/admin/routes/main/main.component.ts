import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

const url = `https://us-central1-${environment.firebase.projectId}.cloudfunctions.net/adminExportAccounts`;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  exportAccountUrl: string;

  constructor(private afa: AngularFireAuth) { }

  ngOnInit() {
    this.afa.idToken.subscribe(x => {
      this.exportAccountUrl = `${url}?tokenId=${x}`;
    });
  }

}
