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

  showCustomUrlInput = false;

  images = [
    {
      thumbnail: 'https://bit.ly/2D5tLdp',
      normal: 'https://bit.ly/2D5tLdp',
    },
    {
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/beach-1867908_small.jpg?alt=media&token=ad047608-8a06-4895-952a-a89dcdc9be48',
      normal: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/beach-1867908_1280.jpg?alt=media&token=429c4ff8-b768-433c-bee1-c939609f1d44',
    },
    {
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/statue-of-liberty-267948_small.jpg?alt=media&token=adbce756-9146-46e5-abbf-a8087134760f',
      normal: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/statue-of-liberty-267948_1280.jpg?alt=media&token=dac43ca6-e094-4341-97b5-edb4bbdbb06e',
    },
    {
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/yellow-vests-3854259_small.jpg?alt=media&token=532e8241-bdcb-470c-9173-f3e2ab0df8d1',
      normal: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/yellow-vests-3854259_1280.jpg?alt=media&token=f580c4bf-dbb2-4d10-ba78-fa6895afd660',
    },
    {
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/business-3167295_small.jpg?alt=media&token=a2670304-cb96-4790-84fd-f4e64e3a9c08',
      normal: 'https://firebasestorage.googleapis.com/v0/b/revendic-prod.appspot.com/o/business-3167295_1280.jpg?alt=media&token=a6f0eb6b-e38c-4e87-9425-df9e4ae49e62',
    }
  ];

  setImage(url) {
    this.f.controls.photo.setValue(url);
  }

  setCustomImage() {
    this.f.controls.photo.setValue('');
    this.showCustomUrlInput = true;
  }

  f = new FormGroup({
    title: new FormControl('', Validators.required),
    constat: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    photo: new FormControl('https://bit.ly/2D5tLdp', Validators.required),
  });

  constructor(private rev: RevService, private router: Router) { 
    this.images.forEach(img => {
      const i = new Image();
      i.src = img.normal;
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.rev.add(this.f.value).then(() => {
      this.router.navigate([''])
    });
  }

}
