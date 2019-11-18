import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAnimesPageRoutingModule } from './list-animes-routing.module';

import { ListAnimesPage } from './list-animes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAnimesPageRoutingModule
  ],
  declarations: [ListAnimesPage]
})
export class ListAnimesPageModule {}
