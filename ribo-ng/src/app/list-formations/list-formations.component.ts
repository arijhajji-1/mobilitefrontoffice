import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/Models/Formation';
import { ReservationFormation } from 'src/Models/ReservationFormation';
import { FormationService } from 'src/Services/FormationService.service';
import { ReservationFormationService } from 'src/Services/ReservationService.service';
import { FavoriteFormationService } from 'src/Services/FavoriteFormationService.service';
import { FavoriteFormation } from 'src/Models/FavoriteFormation';

import { STATIC_USER } from "../static_user";

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.scss']
})
export class ListFormationsComponent implements OnInit {
  formations: any[] = [];
  joined: Formation[] = [];
  favorites: FavoriteFormation[] = [];
  reservations: ReservationFormation[] = [];


  
  user = STATIC_USER;
  constructor(private formationService: FormationService, 
              private reservationService: ReservationFormationService, 
              private favoriteService: FavoriteFormationService) { }

  ngOnInit(): void {
    this.formationService.getAllFormations().subscribe((data: any[]) => {
      this.formations = data;
      this.loadFavorites();
      this.loadReservations();

    });
  }

  loadFavorites(): void {
    if (!this.user.idUser) {
      console.error("User ID is null");
      return;
    }

    console.log("Fetching favorite formations...");
    this.favoriteService.getFavoriteFormation().subscribe(
      (favorites) => {
        console.log("Favorite formations fetched successfully: ", favorites);
        this.favorites = favorites;
        this.formations.forEach((formation) => {
          const favorite = this.favorites.find(
            (f) => f.formation.formationId === formation.formationId
          );
          formation.isFavorite = !!favorite;
        });
      },
      (error) => {
        console.error("Error fetching favorite formations: ", error);
      }
    );
  }

  loadReservations(): void {
    if (!this.user.idUser) {
      console.error("User ID is null");
      return;
    }

    console.log("Fetching reservations...");
    this.reservationService.getAllReservationFormation().subscribe(
      (reservations) => {
        console.log("Reservations fetched successfully: ", reservations);
        this.reservations = reservations;
        this.formations.forEach((formation) => {
          const reservation = this.reservations.find(
            (r) => r.formation.formationId === formation.formationId
          );
          formation.joined = !!reservation;
        });
      },
      (error) => {
        console.error("Error fetching reservations: ", error);
      }
    );
  }
  toggleJoin(formation: any): void {
    formation.joined = !formation.joined;
  
    if (!this.user.idUser) {
      console.error("User ID is null");
      return;
    }
  
    if (formation.joined) {
      console.log("Joining formation: ", formation);
      const reservation = new ReservationFormation();
      reservation.user = this.user;
      reservation.formation = formation;
      this.reservations.push(reservation);
  
      this.reservationService.createReservationFormation(reservation).subscribe(
        (response) => {
          console.log("Reservation created successfully: ", response);
        },
        (error) => {
          console.error("Error creating reservation: ", error);
        }
      );
    } else {
      console.log("Canceling formation: ", formation);
      const reservation = this.reservations.find(
        (r) => r.formation.formationId === formation.formationId
      );
      if (reservation) {
        console.log("Deleting reservation: ", reservation);
        this.reservationService.deleteReservationFormation(reservation.reservationFormationId).subscribe(
          (response) => {
            console.log("Reservation canceled successfully: ", response);
          },
          (error) => {
            console.error("Error canceling reservation: ", error);
          }
        );
  
        const index = this.reservations.indexOf(reservation);
        if (index >= 0) {
          this.reservations.splice(index, 1);
        }
      }
    }
  }
  
  

      toggleFavorite(formation: any): void {
        formation.isFavorite = !formation.isFavorite;
      
        if (!this.user.idUser) {
          console.error("User ID is null");
          return;
        }
      
        console.log("Fetching favorite formations...");
        this.favoriteService.getFavoriteFormation().subscribe(
          (favorites) => {
            console.log("Favorite formations fetched successfully: ", favorites);
      
            const existingFavorite = favorites.find(
              (favorite) =>
                favorite.formation.formationId === formation.formationId
            );
      
            if (formation.isFavorite && existingFavorite) {
              console.log("Formation already exists in favorites: ", existingFavorite);
              return;
            }
      
            if (!formation.isFavorite && !existingFavorite) {
              console.log("Formation does not exist in favorites");
              return;
            }
      
            if (formation.isFavorite) {
              console.log("Creating favorite formation...");
              console.log("Formation ID: ", formation.formationId);
              console.log("User ID: ", this.user.idUser);
      
              this.favoriteService
                .createFavoriteFormation({
                  formation: formation,
                  user: this.user,
                })
                .subscribe(
                  (response) => {
                    console.log("Favorite formation added successfully: ", response);
                  },
                  (error) => {
                    console.error("Error adding favorite formation: ", error);
                  }
                );
            } else {
              console.log("Removing favorite formation...");
              console.log("Favorite formation ID: ", existingFavorite.favoriteFormationId);
      
              this.favoriteService
                .deleteFavoriteFormation(existingFavorite.favoriteFormationId)
                .subscribe(
                  (response) => {
                    console.log("Favorite formation removed successfully: ", response);
                  },
                  (error) => {
                    console.error("Error removing favorite formation: ", error);
                  }
                );
            }
          },
          (error) => {
            console.error("Error fetching favorite formations: ", error);
          }
        );
      }
      
      
      
      
    
      
      
      
      }
      
      
      
      
      
      

  