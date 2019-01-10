import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RevendicationRecord } from 'src/app/rev/revendication.record';
import { RevService } from 'src/app/rev/rev.service';
import { DialogService } from '../../dialog.service';
import { dbg } from 'src/environments/environment';
import { errorFn } from 'src/app/common/utils';

@Component({
  selector: 'app-share-dialog-page',
  templateUrl: './share-dialog-page.component.html',
  styleUrls: ['./share-dialog-page.component.scss']
})
export class ShareDialogPageComponent implements OnInit {

  title = 'Partager';
  data = {};
  href = "";

  constructor(public dialog: DialogService, private rev: RevService) {  }

  share() {
    dbg('this.href', this.href);
    const myUrl = encodeURI(this.href);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${myUrl}&amp;src=sdkpreparse`;
    window.open(url, 'Facebook', 'width=556,height=618');
  }

  ngOnInit() {
    const r: RevendicationRecord = this.data['revendication'];
    this.href = environment.domain + this.rev.getLink(r);
  }

}
