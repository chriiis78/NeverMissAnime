import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'list-animes',
    loadChildren: () => import('./list-animes/list-animes.module').then( m => m.ListAnimesPageModule)
  },
  {
    path: 'user-animes',
    loadChildren: () => import('./user-animes/user-animes.module').then( m => m.UserAnimesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
