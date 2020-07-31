import { EntityRepository, Repository } from 'typeorm';

import { CreateTripDto } from '../trips/dto/create-trip.dto';
import { Trip } from './trip.entity';
import { User } from './user.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{

  public async createTrip(
    createTripDto: CreateTripDto,
    tuser: User,
  ): Promise<Trip> {
    const { name, user }: CreateTripDto = createTripDto;

    const trip = new Trip();
    trip.name = name;
    trip.user = user;
    trip.tuser = tuser;
    delete trip.tuser;

    return trip;
  }
}