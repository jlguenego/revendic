import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './routes/main/main.component';
import { AdminGuard } from '../user/admin.guard';

const routes: Routes = [{ path: 'admin', component: MainComponent, canActivate: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
