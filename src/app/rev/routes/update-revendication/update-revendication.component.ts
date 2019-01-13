import { Component, OnInit } from '@angular/core';
import { RevService } from '../../rev.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-revendication',
  templateUrl: './update-revendication.component.html',
  styleUrls: ['./update-revendication.component.scss']
})
export class UpdateRevendicationComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  revId: string;

  ERROR = RevService.ERROR;
  errorCode: number = undefined;

  f = new FormGroup({
    title: new FormControl('', Validators.required),
    constat: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    photo: new FormControl('https://bit.ly/2D5tLdp', Validators.required),
  });

  constructor(private rev: RevService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.revId = params.id;
      this.rev.get(this.revId).pipe(take(1)).subscribe(revendication => {
        this.f.setValue({
          title: revendication.title,
          constat: revendication.constat,
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

  delete() {
    if (!confirm('Etes-vous sûr de vouloir effacer votre revendication ?')) {
      return;
    }
    this.rev.delete(this.revId).then(this.router.navigate(['/']));

  }

}
