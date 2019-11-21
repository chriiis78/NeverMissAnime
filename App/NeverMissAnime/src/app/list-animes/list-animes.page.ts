import { Component, OnInit, NgZone } from '@angular/core';
import { AnimeService } from './/../services/anime.service';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-animes',
  templateUrl: './list-animes.page.html',
  styleUrls: ['./list-animes.page.scss'],
})
export class ListAnimesPage implements OnInit {
  animes: any[];
  searchTerm: string = '';
  constructor(private animeService: AnimeService) { 
    var timer = interval(1000) 
    .subscribe((val) => { this.updateAiringTime(); });
  }

  ngOnInit() {
  }

  searchChanged() {
    this.animeService.searchData(this.searchTerm).subscribe(animes => this.animes = animes);
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
}
