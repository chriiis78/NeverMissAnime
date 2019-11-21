import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserAnimesPage } from './user-animes/user-animes.page';

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
    private userAnimesPage: UserAnimesPage
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
    });;
  }
}
