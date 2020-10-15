import { UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { User } from '../auth/user.entity';
import { UserType } from '../enums/user-type.enum';
import { Params } from '../models/params.model';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripResponseDto } from './response/trip.dto';
import { Trip } from './trip.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{

  public async customerGetAllTrips(user: User): Promise<Trip[]> {
    const query: SelectQueryBuilder<Trip> = this.createQueryBuilder('trip');
    query.where('trip.userId = :userId', { userId: user.id });
    const trips: Trip[] = await query.getMany();

    return trips;
  }

  public async getAllTrips(
    user: User,
    params: Params,
  ): Promise<TripResponseDto[]> {
    let trips: Trip[];

    if (user.userType === UserType.tripOrganizer) {
      if (!user.approved) {
        throw new UnauthorizedException('Your account must be approved.');
      }

      trips = await this.find({ where: { userId: user.id } });
    } else {
      switch (params.active) {
        case 'true':
          trips = await this.find({ where: { active: true }});
          break;
        case 'false':
          trips = await this.find({ where: { active: false }});
          break;
        default:
          trips = await this.find();
      }
    }

    return trips.map((trip: Trip): TripResponseDto => new TripResponseDto(trip));
  }

  public static async createTrip(
    user: User,
    createTripDto: CreateTripDto,
  ): Promise<TripResponseDto> {
    if (user.approved && user.userType === UserType.tripOrganizer) {
      const trip: Trip = new Trip(createTripDto, user.id);

      trip.user = user;

      await trip.save();

      return new TripResponseDto(trip);
    }

    if (user.userType !== UserType.tripOrganizer) {
      throw new UnauthorizedException('Only Trip Organizers can create a trip.');
    }

    throw new UnauthorizedException('Your account must be approved.');
  }
}
