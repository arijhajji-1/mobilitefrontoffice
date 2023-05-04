import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/Services/EventService.service';
import { STATIC_USER } from '../static_user';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {

  events: any[] = [];
  user = STATIC_USER;

  constructor(private eventService: EventService) { }

  ngOnInit() :void{
    this.eventService.getEventsByUser(this.user.idUser).subscribe((data: any[]) => {
      this.events = data;
    });
  }
}
