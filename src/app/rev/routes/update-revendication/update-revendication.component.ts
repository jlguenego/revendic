import { Component, OnInit } from '@angular/core';
import { RevService } from '../../rev.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-update-revendication',
  templateUrl: './update-revendication.component.html',
  styleUrls: ['./update-revendication.component.scss']
})
export class UpdateRevendicationComponent implements OnInit {

  revId: string;

  ERROR = RevService.ERROR;
  errorCode: number = undefined;

  f = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
    photo: new FormControl(''),
  });

  constructor(private rev: RevService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.revId = params.id;
      this.rev.get(this.revId).pipe(take(1)).subscribe(revendication => {
        this.f.setValue({
          title: revendication.title,
          content: revendication.content,
          category: revendication.category,
          photo: revendication.photo,
        });
      });
    });
  }

  onSubmit() { 
    this.rev.update(this.revId, this.f.value).then(() => {
      this.router.navigate(['mes-revendications'])
    });
  }

}
