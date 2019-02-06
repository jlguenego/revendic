import { Component, OnInit } from '@angular/core';
import { RevendicationRecord } from '../../revendication.record';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreUtilsService } from 'src/app/angular-firestore-utils.service';
import { MetaService } from '@ngx-meta/core';
import { environment, dbg } from 'src/environments/environment';
import { RevService } from '../../rev.service';
import { LikeService } from '../../like.service';
import { map } from 'rxjs/operators';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Observable, BehaviorSubject, noop } from 'rxjs';
import { LikeRecord } from '../../like.record';

@Component({
  selector: 'app-revendication',
  templateUrl: './revendication.component.html',
  styleUrls: ['./revendication.component.scss']
})
export class RevendicationComponent implements OnInit {

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faFacebook = faFacebook;

  r: RevendicationRecord;
  createdAt: Date = new Date();
  isMyRevendication = false;
  editLink;
  photo: string;

  didILiked = false;
  didIDisliked = false;

  likes = 0;
  dislikes = 0;

  constructor(
    private user: UserService,
    private afu: AngularFirestoreUtilsService,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private meta: MetaService,
    public rev: RevService,
    private like: LikeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.user.isConnected().then(() => {
        this.db.doc<LikeRecord>(`/likes-revendications/${params.id}/users/${this.user.uid}`).valueChanges().subscribe(
          likeObj => {
            if (!likeObj) {
              this.didILiked = false;
              this.didIDisliked = false;
            } else if (likeObj.like === 1) {
              this.didILiked = true;
              this.didIDisliked = false;
            } else if (likeObj.like === -1) {
              this.didILiked = false;
              this.didIDisliked = true;
            }
          }
        );
      }).catch(noop);


      this.afu.doc<RevendicationRecord>('/revendications', params.id)
        .pipe<RevendicationRecord>(
          this.like.mapLike.bind(this.like)
        )
        .subscribe(r => {
          this.r = r;
          if (r === undefined) {
            return;
          }

          this.likes = this.r.voters.filter(voter => voter.like === 1).length;
          this.dislikes = this.r.voters.filter(voter => voter.like === -1).length;

          this.isMyRevendication = this.user.uid === this.r.userid;
          this.editLink = `/mes-revendications/edition/${r.id}`;
          this.photo = this.r.photo || 'https://bit.ly/2VS4pYb';

          // meta tags
          const title = 'Revendication: ' + this.r.title;
          this.meta.setTitle(title);
          this.meta.setTag('og:title', title);
          this.meta.setTag('og:description', this.r.content);
          this.meta.setTag('og:type', 'article');
          this.meta.setTag('og:image', this.photo);
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
