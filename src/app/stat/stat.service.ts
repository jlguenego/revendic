import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface StatRecord {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatService {

  totalUser = 0;

  constructor(private http: HttpClient) {
    http.get<StatRecord>(`https://us-central1-${environment.firebase.projectId}.cloudfunctions.net/stats`).subscribe(json => {
      this.totalUser = json.count;
    });
  }
}
