import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { UserType } from '../enums/user-type.enum';
import { Params } from '../models/params.model';
import { Trip } from '../trips/trip.entity';
import { TripRepository } from '../trips/trip.repository';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  public constructor(

    @InjectRepository(TripRepository)
    private readonly tripRepository: TripRepository,
  ) { }

  public async customerGetAllTrips(user: User): Promise<Trip[]> {

    return this.tripRepository.customerGetAllTrips(user);
  }

  public async getAllTrips(
    user: User,
    params: Params,
  ): Promise<Trip[]> {

    return this.tripRepository.getAllTrips(user, params);
  }

  public async getTripById(
    id: number,
    user: User,
  ): Promise<Trip> {
    const found: Trip = await this.tripRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Trip does not exist.`);
    }

    return found;
  }

  public async deleteTrip(
    id: number,
    user: User,
  ): Promise<Trip> {

    if (user.approved && user.userType === UserType.tripOrganizer) {

      const trip: Trip = await this.tripRepository.findOne({ where: { id, active: true, userId: user.id } });
      if (!trip) {
        throw new NotFoundException(`Trip does not exist.`);
      }
      await this.tripRepository.createQueryBuilder('trip')
        .update(Trip)
        .set({ active: false })
        .where({ id })
        .execute();

      return this.tripRepository.findOne({ where: { id } });

    }
    if (user.userType !== UserType.tripOrganizer) {
      throw new UnauthorizedException('Only Trip Organizers can delete a trip.');
    }
    throw new UnauthorizedException('Your account must be approved.');
  }

  public static async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<Trip> {
    return TripRepository.createTrip(createTripDto, user);
  }
}
