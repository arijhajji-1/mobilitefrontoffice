import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../Models/Formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'http://localhost:8081/formations';

  constructor(private http: HttpClient) { }

  createFormation(formation: Formation): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-formation`, formation);
  }

  getFormation(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/get-formation/${id}`);
  }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/get-all-formation`);
  }

  updateFormation(id: number, formation: Formation): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-formation/${id}`, formation);
  }

  deleteFormation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-formation/${id}`);
  }

}
