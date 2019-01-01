import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user/user.service';

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
    content: new FormControl(''),
  });

  constructor(private rev: RevService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('create revendication');
    this.rev.add(this.f.value.content).then(() => {
      this.router.navigate([''])
    });
  }

}
