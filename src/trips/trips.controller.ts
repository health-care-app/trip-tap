import { Controller, Get, Post } from '@nestjs/common';

import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {

  public constructor(
    private readonly tripsService: TripsService,
  ) {
  }

  @Get()
  public getAllTrips(): void {
    console.log('Get All Trips');
    // TODO: Get All Trips
  }

  @Post()
  public createTrip(): void {
    console.log('Create Trip');
    // TODO: Create Trip
  }
}
