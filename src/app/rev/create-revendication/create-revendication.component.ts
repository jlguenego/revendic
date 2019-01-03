import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RevService } from '../rev.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-revendication',
  templateUrl: './create-revendication.component.html',
  styleUrls: ['./create-revendication.component.scss']
})
export class CreateRevendicationComponent implements OnInit {

  ERROR = RevService.ERROR;
  errorCode: number = undefined;

  f = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
  });

  question = new FormGroup({
    mode: new FormControl(''),
    category: new FormControl(''),
    category2: new FormControl(''),
  });

  showForm = false;

  previous;

  constructor(private rev: RevService, private router: Router) { }

  ngOnInit() {
    this.question.valueChanges.subscribe(value => {
      console.log('previous', this.previous);
      console.log('value', value);

      if (this.previous === undefined) {
        this.previous = value;
      }

      if (value.mode !== this.previous.mode && value.category !== '') {
        this.question.setValue({ mode: value.mode, category: '', category2: '' });
      }

      if (value.category !== this.previous.category && value.category2 !== '') {
        this.question.setValue({ mode: value.mode, category: value.category, category2: '' });
      }

      const newValue = this.question.value;
      this.showForm = (newValue.mode === 'expert') ||
        (newValue.category2 !== '');

      this.previous = value;
    });
  }

  onSubmit() {
    this.rev.add(this.f.value).then(() => {
      this.router.navigate([''])
    });
  }

}
