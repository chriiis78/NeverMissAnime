import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './services/fcm.service';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private fcm: FcmService,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('google_user')
      .then( data => {
        if (data != null)
        {
          this.splashScreen.hide();
          this.router.navigate(["/tabs"]);
          console.log("Google_user is saved");
        }
        else
        {
          console.log("Google_user is no saved");
          this.splashScreen.hide();
          this.router.navigate(["/login"]);
        }
      })
      this.statusBar.styleDefault();
      
      // Get a FCM token
      this.fcm.getToken()

      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap(async msg => {
          // show a toast
          var toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          (await toast).present();
        })
      )
      .subscribe()

    });;
  }
}
