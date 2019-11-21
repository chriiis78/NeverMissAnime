import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimeService } from '../services/anime.service'

@Component({
  selector: 'app-user-animes',
  templateUrl: './user-animes.page.html',
  styleUrls: ['./user-animes.page.scss'],
})
export class UserAnimesPage implements OnInit {
  animes: any[];
  constructor(private animeService: AnimeService) {
    animeService.setUserAnimePage(this);
    this.refreshAnimes()
   }

  ngOnInit() {
  }

  refreshAnimes()
  {
    this.animeService.getUserAnimes().subscribe(animes => {
      var tmpArray: any[] = []
      console.log("Animes:" + JSON.stringify(animes));
      animes.forEach(element => {
        tmpArray.push(JSON.parse(element['media']))
      });
      this.animes = tmpArray;
      console.log("Animes:" + JSON.stringify(this.animes));
    })
  }

  animesCountDown() {
  }

  removeAnime(anime: any) {
    this.animeService.removeUserAnime(anime);
    for (var idx = 0; idx < this.animes.length; idx++)
    {
      if (anime['id'] == this.animes[idx]['id'])
      {
        console.log(anime['id'] + ":" +  this.animes[idx]['id'])
        this.animes.splice(idx, 1)
        break;
      }
    }
  }
}
