import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private afAuth: AngularFireAuth, 
    private gplus: GooglePlus,
    private platform: Platform,
    private router: Router,
    private nativeStorage: NativeStorage) { }

  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': '192087476268-e1jf3mk8f1r8aaks096btsdcg8dmjgce.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      var credential = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
      this.router.navigate(["/tabs"]);
      this.nativeStorage.setItem('google_user', {
        name: gplusUser.displayName,
        email: gplusUser.email,
        picture: gplusUser.imageUrl,
      })
      return credential;
  
    } catch(err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      var credential = await this.afAuth.auth.signInWithPopup(provider);
      this.nativeStorage.setItem('google_user', {
        name: credential.user.displayName,
        email: credential.user.email,
        picture: null,
      })
      this.router.navigate(["/tabs"]);
      return credential;
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
    this.nativeStorage.remove('google_user');
  }
}