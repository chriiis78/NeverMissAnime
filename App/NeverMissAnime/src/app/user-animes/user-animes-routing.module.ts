import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAnimesPage } from './user-animes.page';

const routes: Routes = [
  {
    path: '',
    component: UserAnimesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAnimesPageRoutingModule {}
