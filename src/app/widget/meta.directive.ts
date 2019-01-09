import { Directive } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { dbg, environment } from 'src/environments/environment';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Directive({
  selector: '[appMeta]',
  providers: [MetaService],
})
export class MetaDirective {

  constructor(private readonly meta: MetaService, private router: Router, private route: ActivatedRoute) {
    dbg('appMeta working');
    this.router.events.pipe(
      // map(val => {
      //   dbg('val-debug', val);
      //   return val
      // }),
      filter(e => e instanceof NavigationStart),
      map(val => {
        dbg('val', val);
        return (<NavigationStart>val).url;
      }),
    ).subscribe(url => {
      const path = url.replace(/^\/(.*)$/, '$1').replace(/^(.*)?\?.*$/, '$1');
      dbg('path', path);
      const data = router.config.find(route => route.path === path).data;
      let title = 'Revendique.com - Le bon coin de la revendication';
      if (data && data.title) {
        title = data.title;
      } 
      this.meta.setTitle('Revendique.com - ' + title);
      this.meta.setTag('og:title', title);
      this.meta.setTag('og:type', 'article');
      this.meta.setTag('og:image', 'https://static.lpnt.fr/images/2018/11/26/17620105lpw-17620112-article-gilets-jaunes-societe-france-jpg_5759577_660x281.jpg');
      this.meta.setTag('og:url', environment.domain + url);
      dbg('current url', url);

    })

  }

}
