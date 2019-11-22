import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimeService } from '../services/anime.service'

@Component({
  selector: 'app-user-animes',
  templateUrl: './user-animes.page.html',
  styleUrls: ['./user-animes.page.scss'],
})
export class UserAnimesPage implements OnInit {
  animes: any[] = [];
  constructor(private animeService: AnimeService) {
    console.log("CONSCTRU USER ANIME")
    animeService.setUserAnimePage(this);
    this.refreshAnimes()
    var timer = interval(1000) 
    .subscribe((val) => { this.updateAiringTime(); });
   }

  ngOnInit() {
  }

  updateAiringTime()
  {
    this.animes.forEach(element => {
      if (element["nextAiringEpisode"] != null)
        element["nextAiringEpisode"]["timeUntilAiring"] -= 1;
    });
  }

  refreshAnimes()
  {
    console.log("Refresh");
    this.animeService.getUserAnimes()
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
