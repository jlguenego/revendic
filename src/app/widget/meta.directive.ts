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

  constructor(private readonly meta: MetaService, private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(val => {
        return (<NavigationStart>val).url;
      }),
    ).subscribe(url => {
      const path = url.replace(/^\/(.*)$/, '$1').replace(/^(.*)?\?.*$/, '$1');
      const route = router.config.find(route => route.path === path);
      if (!route) {
        return;
      }
      const data = route.data;
      if (data && data.meta) {
        return;
      }
      let title = 'Revendique.com - Le bon coin de la revendication';
      let image = 'https://bit.ly/2rBruCv';
      if (data && data.title) {
        title = data.title;
      }
      if (data && data.image) {
        image = data.image;
      }
      this.meta.setTitle(title);
      this.meta.setTag('og:title', title);
      this.meta.setTag('og:description', 'Le site Revendique.com est la plateforme de mise en relation entre tous ceux qui ont des revendications et les décideurs qui peuvent les aider à les réaliser.');
      this.meta.setTag('og:type', 'article');
      this.meta.setTag('og:image', image);
      this.meta.setTag('og:url', environment.domain + url);

    })

  }

}
