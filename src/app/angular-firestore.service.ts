import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestoreService {

  constructor(public db: AngularFirestore) { }

  query<T>(collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return collection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(change => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          return { id, ...data as unknown } as T;
        });
      })
    );
  }

  doc<T>(collection, id) {
    return this.db.collection(collection).doc(id).snapshotChanges().pipe(
      map(change => {
        if (change.payload.exists === false) {
          return undefined;
        }
        const data = change.payload.data();
        const id = change.payload.id;
        return { id, ...data as unknown } as T;
      })
    );
  }
}
