import { Component, OnInit } from '@angular/core';
import { RevService } from '../../rev.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-revendication',
  templateUrl: './update-revendication.component.html',
  styleUrls: ['./update-revendication.component.scss']
})
export class UpdateRevendicationComponent implements OnInit {

  ERROR = RevService.ERROR;
  errorCode: number = undefined;

  f = new FormGroup({
    title: new FormControl(''),
  });

  constructor(private rev: RevService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const revId = params.id;
      this.rev.get(revId).subscribe(revendication => {
        console.log('revendication', revendication);
        this.f.setValue({
          title: revendication.title,
        });
      });
    });
  }

  onSubmit() { }

}
