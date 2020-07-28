import { EntityRepository, Repository } from 'typeorm';

import { CreateTripDto } from '../trips/dto/create-trip.dto';
import { Trip } from './trip.entity';
import { User } from './user.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{


  async createTrip(
    createTripDto: CreateTripDto,
    tuser: User,
  ): Promise<Trip> {
    const { name, user } = createTripDto;

    const trip = new Trip();
    trip.name = name;
    trip.user = user;
    trip.tuser = tuser; //<-- THIS IS NOT THE USER ENTITY, IT'S USED FOR THE TASK OWNERSHIP.
    await trip.save();

    delete trip.tuser;

    return trip;
  }
}