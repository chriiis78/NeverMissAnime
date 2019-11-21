import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-animes',
  templateUrl: './user-animes.page.html',
  styleUrls: ['./user-animes.page.scss'],
})
export class UserAnimesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public userAnimes: Observable<any>

  animesCountDown() {
    
  }
}
