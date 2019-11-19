import { Component, OnInit } from '@angular/core';
import { AnimeService } from './/../services/anime.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-animes',
  templateUrl: './list-animes.page.html',
  styleUrls: ['./list-animes.page.scss'],
})
export class ListAnimesPage implements OnInit {
  results: Observable<any>;
  searchTerm: string = '';
  constructor(private animeService: AnimeService) { }

  ngOnInit() {
  }

  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.animeService.searchData(this.searchTerm);
  }
}
