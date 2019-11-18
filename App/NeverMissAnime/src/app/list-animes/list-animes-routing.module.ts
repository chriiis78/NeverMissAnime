import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAnimesPage } from './list-animes.page';

const routes: Routes = [
  {
    path: '',
    component: ListAnimesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAnimesPageRoutingModule {}
