import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { Trip } from '@Auth/trip.entity';
import { TripRepository } from '@Auth/trip.repository';

import { User } from '../auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  public constructor(

    @InjectRepository(TripRepository)
    private readonly tripRepository: TripRepository,
  ) { }

  public async getAllTrips(user: User): Promise<Trip[]> {

    return this.tripRepository.getAllTrips(user);
  }

  public async getTripById(
    id: number,
    user: User,
  ): Promise<Trip> {
    const found: Trip = await this.tripRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }

    return found;
  }

  public async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<Trip> {
    return this.tripRepository.createTrip(createTripDto, user);
  }

  public async deleteTrip(
    id: number,
    user: User,
  ): Promise<void> {
    const result: DeleteResult = await this.tripRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }
  }

}
