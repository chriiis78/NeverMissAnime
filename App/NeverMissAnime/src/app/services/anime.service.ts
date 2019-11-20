import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  url = 'http://localhost:8080';
  apiKey = ''; // <-- Enter your own key here!
  constructor(private http: HttpClient,
              private nativeStorage: NativeStorage) { }

  searchData(title: string): Observable<any> {
    return this.http.get(`${this.url}/search?keyword=${encodeURI(title)}`).pipe(
      map(results => results['Page']['media'])
    );
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

  setUserAnimeID(AnimeID: any, Remove: string): any {
    const options = {
      //headers: new HttpHeaders()
      //.append('Accept', 'application/json')
      //.append("Content-Type", 'application/json'),
      params: new HttpParams()
      .append('name', this.nativeStorage.getItem('google_user')['name'])
      .append('AnimeID', AnimeID)
      .append('Remove', Remove)
    }
    return this.http.post(`${this.url}/`, options);
  }
}
