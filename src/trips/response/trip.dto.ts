import { Currency } from '../../enums/currency.enum';
import { Level } from '../../enums/level.enum';
import { Trip } from '../trip.entity';

export interface TripUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  facebookId: string;
  instagramId: string;
}

export class TripResponseDto {
  public id: number;
  public name: string;
  public image: string;
  public description: string;
  public comments: string;
  public location: string;
  public amenities: string;
  public material: string;
  public startTime: number;
  public including: string;
  public dogFriendly: boolean;
  public price: number;
  public currency: Currency;
  public duration: number;
  public level: Level;
  public availableDates: number[];
  public tags: string[];
  public active: boolean;
  public user: TripUser;

  public constructor(trip: Partial<Trip>) {
    this.id = trip.id;
    this.name = trip.name;
    this.image = trip.image;
    this.description = trip.description;
    this.comments = trip.comments;
    this.location = trip.location;
    this.amenities = trip.amenities;
    this.material = trip.material;
    this.startTime = trip.startTime;
    this.including = trip.including;
    this.dogFriendly = trip.dogFriendly;
    this.price = trip.price;
    this.currency = trip.currency;
    this.duration = trip.duration;
    this.level = trip.level;
    this.availableDates = trip.availableDates;
    this.tags = trip.tags;
    this.active = trip.active;
    this.user = {
      id: trip.user.id,
      firstName: trip.user.firstName,
      lastName: trip.user.lastName,
      phoneNumber: trip.user.phoneNumber,
      facebookId: trip.user.facebookId,
      instagramId: trip.user.instagramId,
    };
  }
}
