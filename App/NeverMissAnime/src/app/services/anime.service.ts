import { Injectable, DebugElement } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserAnimesPage } from '../user-animes/user-animes.page';
import { ListAnimesPage } from '../list-animes/list-animes.page';
import { stringify } from 'querystring';
import { Firebase } from '@ionic-native/firebase/ngx';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  //url = 'http://localhost:8080';
  url = 'http://176.175.62.122:8080';
  apiKey = ''; // <-- Enter your own key here!
  searchAnimes: Observable<any>
  userAnimesPage: UserAnimesPage;
  constructor(private http: HttpClient,
              private storage: Storage,
              public firebaseNative: Firebase) { }

  searchData(title: string, listAnimePage: ListAnimesPage): Observable<any> {
    if (listAnimePage.userAnimesPage == null)
      listAnimePage.userAnimesPage =this.userAnimesPage
    if (title.length == 0)
      return null;
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    var searchFilter: any[]
    this.searchAnimes = this.http.get(`${this.url}/search?keyword=${encodeURI(title)}`).pipe(
      map(results => results['Page']['media'])
    )
    return this.searchAnimes;
  }

  setUserAnimePage(userAnimePage: UserAnimesPage)  {
    this.userAnimesPage = userAnimePage;
  }

  userLoggedIn()
  {
    console.log("UserLogged")
    var that = this;
    this.storage.get('google_user').then(async function(value) {
      that.http.post(that.url + "/adduser", 
      {
        userid: value['id'],
        name: value['name'],
        pushtoken: await that.firebaseNative.getToken()
      }).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
    })
    this.userAnimesPage.refreshAnimes();
  }
  
  getUserAnimes() {
    var that = this;
    console.log("GET USER ANIMES")
    this.storage.get('google_user').then(function(value) {
      console.log("UserID:" + value['id'])
      if (value != null)
      {
        console.log("Get:" + that.url + "/useranimes?userid=" + value['id'])
        that.http.get(that.url + "/useranimes?userid=" + value['id']).subscribe(res => {
            var animes:any = res;
            var tmpArray: any[] = []
            animes.forEach(element => {
              tmpArray.push(element['media'])
            })
            that.userAnimesPage.animes = tmpArray;
          }) 
      }
    })
  }

  addUserAnime(Anime: any) {
    var that = this;
    this.storage.get('google_user').then(function(value) {
      console.log("UserID:" + value['id'])
      that.http.post(that.url + "/addepisode", 
      {
        userid: value['id'],
        animeid: Anime['id'],
        episodeid: ((Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['id'] : null),
        airingtime: ((Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['airingAt'] : null),
        media: Anime
      }).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
      that.userAnimesPage.animes.push(Anime)
      console.log("posted");
    })
  }

  removeUserAnime(Anime: any) {
    var that = this;
    this.storage.get('google_user').then(function(value) {
      that.http.post(that.url + "/removeepisode", 
      {
        userid: value['id'],
        animeid: Anime['id'],
        episodeid: ((Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['id'] : null),
        airingtime: ((Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['airingAt'] : null),
        media: Anime
      }).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
    })
  }
}
