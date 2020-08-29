import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { Trip } from '@Auth/trip.entity';
import { TripRepository } from '@Auth/trip.repository';

import { User } from '../auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UserType } from 'src/enums/user-type.enum';

@Injectable()
export class TripsService {
  public constructor(

    @InjectRepository(TripRepository)
    private readonly tripRepository: TripRepository,
  ) { }

  public async customerGetAllTrips(user: User): Promise<Trip[]> {

    return this.tripRepository.customerGetAllTrips(user);
  }

  public async getAllTrips(): Promise<Trip[]> {

    return this.tripRepository.getAllTrips();
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

  public async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<Trip> {
    return this.tripRepository.createTrip(createTripDto, user);
  }

  public async approveCustomer(
    id: number,
    user: User,
  ): Promise<User> {
    const approvedUser: User = await this.tripRepository.approveCustomer(id, user);

    return approvedUser;
  }

  public async deleteTrip(
    id: number,
    user: User,
  ): Promise<void> {
    const { tripOrganizer } = UserType;

    if (user.approved && user.userType === tripOrganizer) {
      const result: DeleteResult = await this.tripRepository.delete({ id, userId: user.id });

      if (result.affected === 0) {
        throw new NotFoundException(`Trip with ID ${id} was not found.`);
      }
    }
    if (!user.approved) {
      throw new UnauthorizedException('Your account must be approved.');
    }
    if (!(user.userType === tripOrganizer)) {
      throw new UnauthorizedException('Only Trip Organizers can delete a trip.');
    }
  }
}
