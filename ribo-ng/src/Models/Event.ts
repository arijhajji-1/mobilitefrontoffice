import { EventType } from "./EventType";
import { User } from "./User";
export class Event {
  

   public eventId!: number;
  public eventTitle!: string;
  public eventDescription!: string;
  public eventDate!: Date;
  public eventStartTime!: Date;
  public eventType!: EventType;
  public eventEndTime!: Date;
  public eventLinkHangout!: string;
  public eventLocation!: string;
  public users!: User[]; // array of users who will attend the event
  attendeeEmails: string[] = [];

  }
  

  