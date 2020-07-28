import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.model';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {

  constructor(
    private readonly tripsService: TripsService,
  ) { }

  @Get()
  getAllTrips(): Trip[] {
    return this.tripsService.getAllTrips();
  }

  @Get('/:id')
  getTripById(@Param('id') id: number): Trip {
    return this.tripsService.getTripById(id)
  }

  @Post()
  public createTrip(@Body() createTripDto: CreateTripDto): Trip {
    return this.tripsService.createTrip(createTripDto); // <-- passing values from the ui body request.
  }

  @Delete('/:id')
  deleteTrip(@Param('id') id: number): void {
    this.tripsService.deleteTrip(id);
  }
}
