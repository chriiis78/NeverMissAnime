import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';

import { GoogleService } from "../services/google.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
              private gplus: GooglePlus,
              private platform: Platform,
              private googleService: GoogleService) {

    this.user = this.afAuth.authState;
  }

  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': '192087476268-e1jf3mk8f1r8aaks096btsdcg8dmjgce.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
  
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }
  
  signOut() {
    this.afAuth.auth.signOut();
  }

  login() {
    this.googleService.googleLogin();
  }
}
