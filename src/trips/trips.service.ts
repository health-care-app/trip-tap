import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { Params } from '../models/params.model';
import { Trip } from '../trips/trip.entity';
import { TripRepository } from '../trips/trip.repository';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripResponseDto } from './response/trip.dto';

@Injectable()
export class TripsService {

  public constructor(
    @InjectRepository(TripRepository)
    private readonly tripRepository: TripRepository,
  ) {
  }

  public async customerGetAllTrips(user: User): Promise<TripResponseDto[]> {
    return this.tripRepository.customerGetAllTrips(user);
  }

  public async getAllTrips(
    user: User,
    params: Params,
  ): Promise<TripResponseDto[]> {
    return this.tripRepository.getAllTrips(user, params);
  }

  public async getTripById(
    id: number,
  ): Promise<TripResponseDto> {
    return this.tripRepository.getTripById(id);
  }

  public async deleteTrip(
    id: number,
    user: User,
  ): Promise<void> {
    return this.tripRepository.deleteTrip(id, user);
  }

  public async createTrip(
    user: User,
    createTripDto: CreateTripDto,
  ): Promise<TripResponseDto> {
    return this.tripRepository.createTrip(createTripDto, user);
  }
}
