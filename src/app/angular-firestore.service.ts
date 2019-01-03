import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestoreService {

  constructor(public db: AngularFirestore) { }

  query<T>(collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return collection.snapshotChanges().pipe(
      map(changes => {
        console.log('changes', changes);
        return changes.map(change => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
