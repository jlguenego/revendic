import { Directive } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { dbg, environment } from 'src/environments/environment';

@Directive({
  selector: '[appMeta]'
})
export class MetaDirective {

  constructor(private meta: Meta) {
    dbg('appMeta working');
    this.meta.addTag({ property: 'og:title', content: 'Revendique.com - Le bon coin de la revendication' });
    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:image', content: 'https://static.lpnt.fr/images/2018/11/26/17620105lpw-17620112-article-gilets-jaunes-societe-france-jpg_5759577_660x281.jpg' });
    this.meta.addTag({ property: 'og:url', content: environment.domain });


    // this.meta.updateTag(tag: MetaDefinition, selector ?: string): HTMLMetaElement | null

  }

}
