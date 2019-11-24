import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx'

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private calendar: Calendar) {

  }

  addEvent(title, text, start) {
    console.log("addEvent " + title)    
    this.calendar.createEvent(title, null, text, start, new Date(start + 3600000))

  } 

}
