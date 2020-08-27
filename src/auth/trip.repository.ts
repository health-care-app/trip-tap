import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateTripDto } from '../trips/dto/create-trip.dto';
import { Trip } from './trip.entity';
import { User } from './user.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{

  public async authGetAllTrips(user: User): Promise<Trip[]> {
    const query: SelectQueryBuilder<Trip> = this.createQueryBuilder('trip');

    query.where('trip.userId = :userId', { userId: user.id });

    const trips: Trip[] = await query.getMany();

    return trips;
  }

  public async getAllTrips(): Promise<Trip[]> {
    const query: SelectQueryBuilder<Trip> = this.createQueryBuilder('trip');
    const trips: Trip[] = await query.getMany();

    return trips;
  }

  // tslint:disable-next-line: prefer-function-over-method
  public async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<Trip> {
    const { name }: CreateTripDto = createTripDto;

    const trip: Trip = new Trip();
    trip.name = name;
    trip.user = user;

    await trip.save();

    delete trip.user;

    return trip;
  }
}
