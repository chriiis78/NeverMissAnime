import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';

import { UserAnimesPage } from '../user-animes/user-animes.page'
import { AnimeService } from './anime.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
    private gplus: GooglePlus,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private animeService: AnimeService) { 
      this.user = this.afAuth.authState;
    }

  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      console.log("Avant Avant log")
      const gplusUser = await this.gplus.login({
        'webClientId': '192087476268-j5a7ujk57d50tm782a2ndd53oj0i1nda.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      console.log("Avant log")
      var credential = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
      this.user.subscribe(user => { 
        console.log("LOOOOOOOOOOOOOOOOOOOOOGEEEEEEEEEEDDDDDDDDDDDDD")

        this.storage.set('google_user', {
        id: user.uid,
        name: gplusUser.displayName,
        email: gplusUser.email,
        picture: gplusUser.imageUrl,
      }).then(value => {
        this.animeService.userLoggedIn()
        this.router.navigate(["/tabs"]);
        })
      })
      return credential;
    } catch(err) {
      console.log("error log")
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      var credential = await this.afAuth.auth.signInWithPopup(provider);
      this.user.subscribe(user => {
        this.storage.set('google_user', {
        id: user.uid,
        name: credential.user.displayName,
        email: credential.user.email,
        picture: null,
      }).then(value => {

        this.animeService.userLoggedIn()
        this.router.navigate(["/tabs"]);
        })
    })
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
    this.storage.remove('google_user');
  }
}
