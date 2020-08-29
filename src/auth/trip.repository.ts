import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder, getManager } from 'typeorm';

import { CreateTripDto } from '../trips/dto/create-trip.dto';
import { Trip } from './trip.entity';
import { User } from './user.entity';

import { UserType } from 'src/enums/user-type.enum';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip>{

  public async customerGetAllTrips(user: User): Promise<Trip[]> {

    const query: SelectQueryBuilder<Trip> = this.createQueryBuilder('trip');

    query.where('trip.userId = :userId', { userId: user.id });

    const trips: Trip[] = await query.getMany();

    return trips;
  }

  public async getAllTrips(): Promise<Trip[]> {
    const query: SelectQueryBuilder<Trip> = this.createQueryBuilder('trip');
    const trips: Trip[] = await query.getMany();

    return trips;
  }

  // tslint:disable-next-line: prefer-function-over-method
  public async createTrip(
    createTripDto: CreateTripDto,
    user: User,
  ): Promise<Trip> {
    // tslint:disable-next-line: typedef
    const { tripOrganizer } = UserType;

    if (user.approved && user.userType === tripOrganizer) {
      const { name }: CreateTripDto = createTripDto;

      const trip: Trip = new Trip();
      trip.name = name;
      trip.user = user;

      await trip.save();

      delete trip.user;

      return trip;
    }
    if (!user.approved) {
      throw new UnauthorizedException('Your account must be approved.');
    }
    throw new UnauthorizedException('Only Trip Organizers can create a trip.');

  }

  // tslint:disable-next-line: prefer-function-over-method
  public async approveCustomer(
    id: number,
    user: User,
  ): Promise<User> {
    const { admin } = UserType;

    if (user.userType === admin) {
      await this.createQueryBuilder()
        .update(User)
        .set({ approved: true })
        .where({ id })
        .execute();

      const approvedUser: User = await getManager()

        .createQueryBuilder(User, 'user')
        .where({ id })
        .getOne();

      return approvedUser;
    }
    throw new UnauthorizedException('Only Admins can approve a user.');

  }
}
