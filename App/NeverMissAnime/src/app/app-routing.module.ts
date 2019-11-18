import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  {
    path: 'user-animes',
    loadChildren: () => import('./user-animes/user-animes.module').then( m => m.UserAnimesPageModule)
  },
  {
    path: 'list-animes',
    loadChildren: () => import('./list-animes/list-animes.module').then( m => m.ListAnimesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
