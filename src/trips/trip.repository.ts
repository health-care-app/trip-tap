import { UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { User } from '../auth/user.entity';
import { UserType } from '../enums/user-type.enum';
import { Params } from '../models/params.model';
import { CreateTripDto } from './dto/create-trip.dto';
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
  ): Promise<Trip[]> {
    let query: SelectQueryBuilder<Trip>;

    if (user.userType === UserType.tripOrganizer) {
      if (!user.approved) {
        throw new UnauthorizedException('Your account must be approved.');
      }
      query = this.createQueryBuilder('trip');
      query.where('trip.userId = :userId', { userId: user.id });

      return query.getMany();
    }
    if (params.active === 'true') {
      query = this.createQueryBuilder('trip')
        .where({ active: true });

      return query.getMany();
    }
    if (params.active === 'false') {
      query = this.createQueryBuilder('trip')
        .where({ active: false });

      return query.getMany();
    }
    query = this.createQueryBuilder('trip');

    return query.getMany();
  }

  public static async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<Trip> {
    if (user.approved && user.userType === UserType.tripOrganizer) {
      const trip: Trip = new Trip();
      trip.comment = createTripDto.comment;
      trip.date = createTripDto.date;
      trip.image = createTripDto.image;
      trip.description = createTripDto.description;
      trip.active = true;
      trip.name = createTripDto.name;
      trip.user = user;
      await trip.save();
      delete trip.user;

      return trip;
    }
    if (user.userType !== UserType.tripOrganizer) {
      throw new UnauthorizedException('Only Trip Organizers can create a trip.');
    }
    throw new UnauthorizedException('Your account must be approved.');
  }
}
