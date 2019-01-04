import { Component, OnInit } from '@angular/core';
import { RevService } from 'src/app/rev/rev.service';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-need-account-dialog-page',
  templateUrl: './need-account-dialog-page.component.html',
  styleUrls: ['./need-account-dialog-page.component.scss']
})
export class NeedAccountDialogPageComponent implements OnInit {

  title = 'Et si vous obteniez un compte citoyen ?';

  constructor(public dialog: DialogService) { }

  ngOnInit() {
  }

}
