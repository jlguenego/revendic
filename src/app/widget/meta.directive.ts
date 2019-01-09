import { Directive } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { dbg, environment } from 'src/environments/environment';

@Directive({
  selector: '[appMeta]',
  providers: [MetaService],
})
export class MetaDirective {

  constructor(private readonly meta: MetaService) {
    dbg('appMeta working');
    this.meta.setTag('og:title', 'Revendique.com - Le bon coin de la revendication');
    this.meta.setTag('og:type', 'article');
    this.meta.setTag('og:image', 'https://static.lpnt.fr/images/2018/11/26/17620105lpw-17620112-article-gilets-jaunes-societe-france-jpg_5759577_660x281.jpg');
    this.meta.setTag('og:url', environment.domain);

  }

}
