import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAnimesPageRoutingModule } from './user-animes-routing.module';

import { UserAnimesPage } from './user-animes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAnimesPageRoutingModule
  ],
  declarations: [UserAnimesPage]
})
export class UserAnimesPageModule {}
