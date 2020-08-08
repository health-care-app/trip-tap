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

  public async getAllTrips(tuser: User): Promise<Trip[]> {

    return this.tripRepository.getAllTrips(tuser);
  }

  public async getTripById(
    id: number,
    tuser: User,
  ): Promise<Trip> {
    const found: Trip = await this.tripRepository.findOne({ where: { id, tuserId: tuser.id } });
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

  public async deleteTrip(
    id: number,
    tuser: User,
  ): Promise<void> {
    const result: DeleteResult = await this.tripRepository.delete({ id, tuserId: tuser.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Trip with ID ${id} was not found.`);
    }
  }

}
