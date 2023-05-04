import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationFormation } from '../Models/ReservationFormation';

@Injectable({
  providedIn: 'root'
})
export class ReservationFormationService {

  private baseUrl = 'http://localhost:8081/reservationFormations';

  constructor(private http: HttpClient) { }

  createReservationFormation(reservationFormation: ReservationFormation): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-reservation-formation`, reservationFormation);
  }

  getReservationFormation(reservationFormationId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-reservation-formation/${reservationFormationId}`);
  }

  getAllReservationFormation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-reservation-formation`);
  }

  updateReservationFormation(reservationFormationId: number, reservationFormation: ReservationFormation): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-reservation-formation/${reservationFormationId}`, reservationFormation);
  }

  deleteReservationFormation(reservationFormationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-reservation-formation/${reservationFormationId}`);
  }

  approveReservationFormation(reservationFormationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve-reservation-formation/${reservationFormationId}`, null);
  }

  rejectReservationFormation(reservationFormationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/reject-reservation-formation/${reservationFormationId}`, null);
  }

  cancelReservationFormation(reservationFormationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cancel-reservation-formation/${reservationFormationId}`, null);
  }

  findReservationFormationByReservationFormationStatus(reservationFormationStatus: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/find-reservation-formation-by-status/${reservationFormationStatus}`);
  }
}
