import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }  from 'angularfire2/auth'
import { IonicStorageModule } from '@ionic/storage';

import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { FcmService } from './services/fcm.service';

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
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    Firebase,
    FcmService,
    StatusBar,
    SplashScreen,
    GooglePlus,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
