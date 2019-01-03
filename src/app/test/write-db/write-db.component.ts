import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-write-db',
  templateUrl: './write-db.component.html',
  styleUrls: ['./write-db.component.scss']
})
export class WriteDbComponent implements OnInit {

  f: FormGroup = new FormGroup({
    content: new FormControl('this is some default text'),
  });

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  onSubmit() {
    const content = this.f.value.content;
    const timestamp = firestore.FieldValue.serverTimestamp();
    const revendicationRecord = {
      title: content,
      createdAt: timestamp,
    };

    return this.db.collection("revendications").add(revendicationRecord).then(docRef => {
      
    }).catch(error => {
      console.error("Error adding document: ", error);
    });
  }

}
