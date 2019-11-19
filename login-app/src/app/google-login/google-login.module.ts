import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { GoogleLoginComponent } from './google-login.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [GoogleLoginComponent]
})
export class GoogleLoginModule { }
