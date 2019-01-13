import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RevendicationRecord } from 'src/app/rev/revendication.record';
import { RevService } from 'src/app/rev/rev.service';
import { DialogService } from '../../dialog.service';
import { dbg } from 'src/environments/environment';
import { errorFn } from 'src/app/common/utils';
import { FacebookService } from 'src/app/widget/facebook.service';

@Component({
  selector: 'app-share-dialog-page',
  templateUrl: './share-dialog-page.component.html',
  styleUrls: ['./share-dialog-page.component.scss']
})
export class ShareDialogPageComponent implements OnInit {

  title = 'Partager';
  data = {};
  href = "";

  constructor(private facebook: FacebookService, public dialog: DialogService, private rev: RevService) {  }

  share() {
    dbg('this.href', this.href);
    this.facebook.share(this.href);
  }

  ngOnInit() {
    const r: RevendicationRecord = this.data['revendication'];
    this.href = environment.domain + this.rev.getLink(r);
  }

}
