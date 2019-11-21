import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserAnimesPage } from './user-animes/user-animes.page';

import { FCM } from '@ionic-native/fcm/ngx';

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
    private userAnimesPage: UserAnimesPage,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.storage.remove('google_user');
    this.platform.ready().then(() => {
      this.storage.get('google_user')
      .then( data => {
        if (data != null)
        {
          this.userAnimesPage.refreshAnimes();
          this.router.navigate(["/tabs"]);
          this.splashScreen.hide();
          console.log("Google_user is saved");
        }
        else
        {
          console.log("Google_user is no saved");
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        }
      })
      this.statusBar.styleDefault();

      // FIREBASE PUSH NOTIFICATION
      this.fcm.getToken().then(token => {
        console.log(token);
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });

    });;
  }
}
