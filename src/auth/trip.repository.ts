
import { EntityRepository, Repository } from 'typeorm';

import { Trip } from './trip.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{

}