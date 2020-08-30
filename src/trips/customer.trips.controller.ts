
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';

import { User } from '../auth/user.entity';
import { Trip } from '../trips/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';

@Controller('customer/trips')
@UseGuards(AuthGuard())
export class CustomerTripsController {

  public constructor(
    private readonly tripsService: TripsService,
  ) { }

  @Get()
  public async getAllTrips(@GetUser() user: User): Promise<Trip[]> {
    return this.tripsService.customerGetAllTrips(user);
  }

  

}
