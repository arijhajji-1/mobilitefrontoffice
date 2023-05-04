import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteFormation } from '../Models/FavoriteFormation';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFormationService {
  private baseUrl = 'http://localhost:8081/favoriteFormations';

  constructor(private http: HttpClient) { }

  createFavoriteFormation(favoriteFormation: FavoriteFormation): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-favorite-formation`, favoriteFormation);
  }

  deleteFavoriteFormation(favoriteFormationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-favorite-formation/${favoriteFormationId}`);
  }
  getFavoriteFormation(): Observable<FavoriteFormation[]>
    {
        return this.http.get<FavoriteFormation[]>(`${this.baseUrl}/get-favorite-formation`);
    }
}
