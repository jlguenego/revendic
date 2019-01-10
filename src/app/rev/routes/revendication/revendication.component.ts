import { Component, OnInit } from '@angular/core';
import { RevendicationRecord } from '../../revendication.record';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreUtilsService } from 'src/app/angular-firestore-utils.service';
import { MetaService } from '@ngx-meta/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-revendication',
  templateUrl: './revendication.component.html',
  styleUrls: ['./revendication.component.scss']
})
export class RevendicationComponent implements OnInit {

  r: RevendicationRecord;
  createdAt: Date = new Date();
  isMyRevendication = false;
  editLink;
  photo: string;

  constructor(
    private user: UserService,
    private afu: AngularFirestoreUtilsService,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private meta: MetaService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.afu.doc<RevendicationRecord>('/revendications', params.id).subscribe(r => {
        this.r = r;
        if (r === undefined) {
          return;
        }
        this.isMyRevendication = this.user.uid === this.r.userid;
        this.editLink = `/mes-revendications/edition/${r.id}`;
        this.photo = this.r.photo || 'https://static.lpnt.fr/images/2018/11/26/17620105lpw-17620112-article-gilets-jaunes-societe-france-jpg_5759577_660x281.jpg';
        

        // meta tags
        const title = 'Revendication: ' + this.r.title;
        this.meta.setTitle(title);
        this.meta.setTag('og:title', title);
        this.meta.setTag('og:description', this.r.content);
        this.meta.setTag('og:type', 'article');
        this.meta.setTag('og:image', 'https://static.lpnt.fr/images/2018/11/26/17620105lpw-17620112-article-gilets-jaunes-societe-france-jpg_5759577_660x281.jpg');
        this.meta.setTag('og:url', environment.domain + this.router.url);
      });
    });
  }

  delete() {
    const bool = window.confirm('Etes-vous sûr de vouloir effacer cette revendication ?');
    if (bool) {
      this.db.doc(`/revendications/${this.r.id}`).delete()
        .then((obj) => {
          this.router.navigate(['/'])
        })
        .catch(
          error => console.error('error', error)
        );
    }
  }

}
