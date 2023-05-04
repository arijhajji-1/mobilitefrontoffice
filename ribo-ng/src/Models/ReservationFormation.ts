import { User } from './User';
import { Formation } from './Formation';
import { ReservationFormationStatus } from './ReservationFormationStatus';
export class ReservationFormation {
    reservationFormationId!: number;
    reservationFormationStatus!: ReservationFormationStatus;
    user!: User;
    formation!: Formation;
  }