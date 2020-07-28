import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';
import { Trip } from '@Auth/trip.entity';

import { User } from '../auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';

@Controller('trips')
@UseGuards(AuthGuard())
export class TripsController {

  constructor(
    private readonly tripsService: TripsService,
  ) { }

  @Get()
  getAllTrips(): Promise<Trip[]> {
    return this.tripsService.getAllTrips();
  }

  @Get('/:id')
  getTripById(@Param('id', ParseIntPipe) id: number): Promise<Trip> {
    return this.tripsService.getTripById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTrip(
    @Body() createTripDto: CreateTripDto,
    @GetUser() tuser: User
  ): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto, tuser); // <-- passing values from the ui body request.
  }

  @Delete('/:id')
  deleteTrip(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tripsService.deleteTrip(id);
  }
}
