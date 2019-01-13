import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RevService } from '../rev.service';
import { Router } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-revendication',
  templateUrl: './create-revendication.component.html',
  styleUrls: ['./create-revendication.component.scss']
})
export class CreateRevendicationComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  ERROR = RevService.ERROR;
  errorCode: number = undefined;

  f = new FormGroup({
    title: new FormControl('', Validators.required),
    constat: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
  });

  constructor(private rev: RevService, private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.rev.add(this.f.value).then(() => {
      this.router.navigate([''])
    });
  }

}
