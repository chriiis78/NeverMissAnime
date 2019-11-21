import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserAnimesPage } from '../user-animes/user-animes.page';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  url = 'http://localhost:8080';
  apiKey = ''; // <-- Enter your own key here!
  searchAnimes: Observable<any>
  constructor(private http: HttpClient,
              private nativeStorage: NativeStorage,
              private userAnimesPage: UserAnimesPage) { }

  searchData(title: string): Observable<any> {
    if (title.length == 0)
      return null;
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    this.searchAnimes = this.http.get(`${this.url}/search?keyword=${encodeURI(title)}`).pipe(
      map(results => results['Page']['media'])
    );
    return this.searchAnimes;
  }
  
  getUserAnimes(): Observable<any> {
    const options = {
      //headers: new HttpHeaders()
      //.append('Accept', 'application/json')
      //.append("Content-Type", 'application/json'),
      params: new HttpParams()
      .append('name', this.nativeStorage.getItem('google_user')['name'])
    }
    return this.http.post(`${this.url}/user-animes`, options).pipe(
      map(results => results['Animes'])
    );
  }

  addUserAnimeID(AnimeID: any) {
    const options = {
      headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append("Content-Type", 'application/json'),
      params: new HttpParams()
      .append('name', this.nativeStorage.getItem('google_user')['name'])
      .append('AnimeID', AnimeID)
    }
    this.userAnimesPage.userAnimes = this.http.post(`${this.url}/add-anime`, options);
  }

  removeUserAnimeID(AnimeID: any) {
    const options = {
      headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append("Content-Type", 'application/json'),
      params: new HttpParams()
      .append('name', this.nativeStorage.getItem('google_user')['name'])
      .append('AnimeID', AnimeID)
    }
    this.userAnimesPage.userAnimes = this.http.post(`${this.url}/remove-anime`, options);
  }
}
