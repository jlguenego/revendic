import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface StatRecord {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatService {

  totalUser = 0;

  constructor(private http: HttpClient) {
    http.get<StatRecord>('http://localhost:5001/revendic-prod/us-central1/stats').subscribe(json => {
      this.totalUser = json.count;
    });
  }
}
