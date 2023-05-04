import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8081/events';

  constructor(private http: HttpClient) { }

  createEvent(event: Event): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-event`, event);
  }

  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/get-event/${eventId}`);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/get-all-event`);
  }

  updateEvent(eventId: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/update-event/${eventId}`, event);
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-event/${eventId}`);
  }

  getEventsByUser(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/get-event-by-user/${userId}`);
  }

  generateExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/generateExcel`, { responseType: 'blob' });
  }
}
