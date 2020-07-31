import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { GetUser } from '@Auth/get-user.decorator';
import { Trip } from '@Auth/trip.entity';
import { TripRepository } from '@Auth/trip.repository';

import { User } from '../auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  // private readonly trips: Trip[] = [];
  public constructor(

    @InjectRepository(TripRepository)
    private readonly tripRepository: TripRepository,
  ) { }

  public async getAllTrips(): Promise<Trip[]> {
    const found: Trip[] = await this.tripRepository.find();

    return found;
  }

  public async getTripById(id: number): Promise<Trip> {
    const found: Trip = await this.tripRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }

    return found;
  }

  public async createTrip(
    createTripDto: CreateTripDto,
    tuser: User,
  ): Promise<Trip> {
    return this.tripRepository.createTrip(createTripDto, tuser);
  }

  public async deleteTrip(id: number): Promise<void> {
    const result: DeleteResult = await this.tripRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }
  }

}
