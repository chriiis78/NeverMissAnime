import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
  path: 'tabs',
  component: TabsPage,
  children: [
    {
      path: 'list-animes',
      children: [
        {
          path: '',
          loadChildren: '../list-animes/list-animes.module#ListAnimesPageModule'
        }
      ]
    },
    {
      path: 'user-animes',
      children: [
        {
          path: '',
          loadChildren: '../user-animes/user-animes.module#UserAnimesPageModule'
        }
      ]
    },
    {
      path: '',
      redirectTo: '/tabs/list-animes',
      pathMatch: 'full'
    }
  ]
},
{
  path: '',
  redirectTo: '/tabs/list-animes',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
