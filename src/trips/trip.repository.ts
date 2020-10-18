import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { UserType } from '../enums/user-type.enum';
import { Params } from '../models/params.model';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripResponseDto } from './response/trip.dto';
import { Trip } from './trip.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{

  // TODO: Refactor, move to own repository
  public async customerGetAllTrips(user: User): Promise<TripResponseDto[]> {
    const trips: Trip[] = await this.find({ where: { userId: user.id } });

    return trips.map((trip: Trip): TripResponseDto => new TripResponseDto(trip));
  }

  public async getAllTrips(
    user: User,
    params: Params,
  ): Promise<TripResponseDto[]> {
    let trips: Trip[];

    if (user.userType === UserType.tripOrganizer) {
      if (!user.approved) {
        throw new UnauthorizedException('Your account must be approved.');
      }

      trips = await this.find({ where: { userId: user.id } });
    } else {
      switch (params.active) {
        case 'true':
          trips = await this.find({ where: { active: true }});
          break;
        case 'false':
          trips = await this.find({ where: { active: false }});
          break;
        default:
          trips = await this.find();
      }
    }

    return trips.map((trip: Trip): TripResponseDto => new TripResponseDto(trip));
  }

  public async getTripById(
    id: number,
  ): Promise<TripResponseDto> {
    const trip: Trip = await this.findOne({ where: { id } });

    if (!trip) {
      throw new NotFoundException(`Trip does not exist.`);
    }

    return new TripResponseDto(trip);
  }

  public async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<TripResponseDto> {
    if (user.approved && user.userType === UserType.tripOrganizer) {
      const trip: Trip = new Trip(createTripDto, user.id);

      await this.save(trip);

      return new TripResponseDto({ ...trip, user });
    }

    if (user.userType !== UserType.tripOrganizer) {
      throw new UnauthorizedException('Only Trip Organizers can create a trip.');
    }

    throw new UnauthorizedException('Your account must be approved.');
  }

  public async deleteTrip(
    id: number,
    user: User,
  ): Promise<void> {
    if (user.approved && user.userType === UserType.tripOrganizer) {
      const trip: Trip = await this.findOne({ where: { id, active: true, userId: user.id } });

      if (!trip) {
        throw new NotFoundException('Trip does not exist.');
      }

      await this.update(trip.id, { active: false });

      return;
    }

    if (user.userType !== UserType.tripOrganizer) {
      throw new UnauthorizedException('Only Trip Organizers can delete a trip.');
    }

    throw new UnauthorizedException('Your account must be approved.');
  }
}
