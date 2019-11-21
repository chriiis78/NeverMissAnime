import { Component, OnInit, NgZone } from '@angular/core';
import { AnimeService } from './/../services/anime.service';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAnimesPage } from '../user-animes/user-animes.page'

@Component({
  selector: 'app-list-animes',
  templateUrl: './list-animes.page.html',
  styleUrls: ['./list-animes.page.scss'],
})
export class ListAnimesPage implements OnInit {
  animes: any[];
  searchTerm: string = '';
  constructor(private animeService: AnimeService,
              private userAnimesPage: UserAnimesPage) { 
    var timer = interval(1000) 
    .subscribe((val) => { this.updateAiringTime(); });
  }

  ngOnInit() {
  }

  searchChanged() {
    if (this.searchTerm != "")
    this.animeService.searchData(this.searchTerm).subscribe(animes => {
      this.animes = animes
      for (var searchIdx = 0; searchIdx < this.animes.length; searchIdx++) {
        if (this.userAnimesPage.animes == null)
          break;
          for (var idx = 0; idx < this.userAnimesPage.animes.length; idx++)
          {
            console.log("ELEMENT " + JSON.stringify(this.animes[searchIdx]['id']));
            console.log(JSON.stringify(this.userAnimesPage.animes[idx]['id']));
            if (this.animes[searchIdx]['id'] == this.userAnimesPage.animes[idx]['id'])
            {
              console.log(this.animes[searchIdx]['id'] + ":" +  this.userAnimesPage.animes[idx]['id'])
              this.animes.splice(searchIdx, 1)
              break;
            }
          }
      }
    });
  }

  updateAiringTime()
  {
    if (this.animes == null)
      return;
    this.animes.forEach(element => {
      if (element["nextAiringEpisode"])
        element["nextAiringEpisode"]["timeUntilAiring"] -= 1;
    });
  }

  addAnime(Anime: any)
  {
    this.animeService.addUserAnime(Anime)
    for (var idx = 0; idx < this.animes.length; idx++)
    {
      if (Anime['id'] == this.animes[idx]['id'])
      {
        console.log(Anime['id'] + ":" +  this.animes[idx]['id'])
        this.animes.splice(idx, 1)
        break;
      }
    }
  }
}
