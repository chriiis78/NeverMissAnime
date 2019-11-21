import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserAnimesPage } from '../user-animes/user-animes.page';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  url = 'http://localhost:8080';
  //url = 'http://176.175.62.122:8080';
  apiKey = ''; // <-- Enter your own key here!
  searchAnimes: Observable<any>
  userAnimesPage: UserAnimesPage;
  constructor(private http: HttpClient,
              private storage: Storage) { }

  searchData(title: string): Observable<any> {
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
    this.storage.get('google_user').then(function(value) {
    const options = {
      headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append("Content-Type", 'application/json'),
      params: new HttpParams()
      .append('userid', value['id'])
      .append('name', value['name'])
    }
    this.http.post(`${this.url}/adduser`, options)
    })
  }
  
  getUserAnimes(): Observable<any> {
      return this.http.get(`${this.url}/useranimes?userid=111`)
  }

  addUserAnime(Anime: any) {
    this.storage.get('google_user').then(function(value) {
    const options = {
      headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append("Content-Type", 'application/json'),
    }
    this.http.post(`${this.url}/addepisode`,
    {
      userid: value['id'],
      episodeid: (Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['id'] : null
    }, options);
    this.userAnimesPage.animes.push(Anime);
    })
  }

  removeUserAnime(Anime: any) {
    this.storage.get('google_user').then(function(value) {
      const options = {
        headers: new HttpHeaders()
        .append('Accept', 'application/json')
        .append("Content-Type", 'application/json'),
        params: new HttpParams()
        .append('userid', value['id'])
        .append('animeid', Anime['id'])
        .append('episodeid', (Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['id'] : null)
        .append('airingtime', (Anime['nextAiringEpisode']) ? Anime['nextAiringEpisode']['timeUntilAiring'] : null)
        .append('media', Anime)
      }
      this.http.post(`${this.url}/removeepisode`, options)
    })
  }
}
