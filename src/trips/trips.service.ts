import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GetUser } from '@Auth/get-user.decorator';
import { Trip } from '@Auth/trip.entity';
import { TripRepository } from '@Auth/trip.repository';

import { User } from '../auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable() //making it available for injection in other components.
export class TripsService {
  // private readonly trips: Trip[] = [];
  constructor(

    @InjectRepository(TripRepository)
    private tripRepository: TripRepository,
  ) { }

  async getAllTrips(): Promise<Trip[]> { //grants us access to the trips array, when calling it from the controller.
    const found = await this.tripRepository.find();

    return found;
  }

  async getTripById(id: number): Promise<Trip> {
    const found = await this.tripRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }

    return found;
  }

  async createTrip(
    createTripDto: CreateTripDto,
    tuser: User,
    ): Promise<Trip> {
    return this.tripRepository.createTrip(createTripDto, tuser);
  }

  async deleteTrip(id: number): Promise<void> {
    const result = await this.tripRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }
  }

}
