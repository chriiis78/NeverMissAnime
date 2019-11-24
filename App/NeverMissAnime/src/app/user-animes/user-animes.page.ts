import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimeService } from '../services/anime.service'
import { CalendarService } from '../services/calendar.service'

@Component({
  selector: 'app-user-animes',
  templateUrl: './user-animes.page.html',
  styleUrls: ['./user-animes.page.scss'],
})
export class UserAnimesPage implements OnInit {
  animes: any[] = [];
  constructor(private animeService: AnimeService,
              private calendarService: CalendarService) {
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
      var day = Math.trunc((element['nextAiringEpisode']['airingAt'] - Date.now() / 1000) / 86400);
      var hour = Math.trunc((element['nextAiringEpisode']['airingAt'] - Date.now() / 1000) / 3600 % 24);
      var min = Math.trunc((element['nextAiringEpisode']['airingAt'] - Date.now() / 1000) % 3600 / 60);
      var sec = Math.trunc((element['nextAiringEpisode']['airingAt'] - Date.now() / 1000) % 3600 % 60);
      element['timeCounter'] =
      day + " " + ((day > 0) ? 'Days' : 'Day') + " and " +
      hour + " " + ((hour > 0) ? 'Hours' : 'Hour') + " " +
      min + " " + ((min > 0) ? 'Minutes' : 'Minute') + " " +
      sec + " " + ((sec > 0) ? 'Seconds' : 'Second')
      element['timeCounter'] =
      day + " " + ((day > 0) ? 'days' : 'day') + " and " +
      hour + "h "+
      min +"m "+
      sec +"s"
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

  addCalendar(Anime: any) {
    this.calendarService.addEvent(
      (Anime['title']['english']) ? Anime['title']['english'] : Anime['title']['romaji'],
      "Episode: " + Anime['nextAiringEpisode']['episode'],
      new Date(Anime['nextAiringEpisode']['airingAt'] * 1000)
    )
  }
}
