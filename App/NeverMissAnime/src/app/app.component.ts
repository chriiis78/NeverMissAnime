import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //Here we will check if the user is already logged in
      //because we don't want to ask users to log in each time they open the app
  /*    this.storage.get('google_user')
      .then( data => {
        //user is previously logged and we have his data
        //we will let him access the app*/
        console.log("Google_user is saved");
        this.router.navigate(["/tabs"]);
        this.splashScreen.hide();
      /*}, err => {
        console.log("Google_user is no saved");
        this.router.navigate(["/login"]);
        this.splashScreen.hide();
      })*/
      this.statusBar.styleDefault();
    });;
  }
}
