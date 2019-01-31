import { NeedAccountDialogPageComponent } from './pages/need-account-dialog-page/need-account-dialog-page.component';
import { ShareDialogPageComponent } from './pages/share-dialog-page/share-dialog-page.component';
import { AccountNotVerifiedPageComponent } from './pages/account-not-verified-page/account-not-verified-page.component';

export class DialogPages {
    static pages = {
        needAccount: NeedAccountDialogPageComponent,
        needVerified: AccountNotVerifiedPageComponent,
        share: ShareDialogPageComponent,
    }
}
