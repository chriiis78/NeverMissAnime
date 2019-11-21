import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }  from 'angularfire2/auth'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { FCM } from '@ionic-native/fcm/ngx'

const firebaseConfig = {
  apiKey: "AIzaSyBbz94jZI4Uy_P4yAKJlAs_CG9gcFNUkZ4",
  authDomain: "nevermissanime.firebaseapp.com",
  databaseURL: "https://nevermissanime.firebaseio.com",
  projectId: "nevermissanime",
  storageBucket: "nevermissanime.appspot.com",
  messagingSenderId: "192087476268",
  appId: "1:192087476268:web:3df8310ee1eb2201c9a989",
  measurementId: "G-DR2VQP3DXY"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    FCM,
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
