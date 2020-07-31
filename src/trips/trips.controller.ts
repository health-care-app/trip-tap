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

  public constructor(
    private readonly tripsService: TripsService,
  ) { }

  @Get()
  public async getAllTrips(): Promise<Trip[]> {
    return this.tripsService.getAllTrips();
  }

  @Get('/:id')
  public async getTripById(@Param('id', ParseIntPipe) id: number): Promise<Trip> {
    return this.tripsService.getTripById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTrip(
    @Body() createTripDto: CreateTripDto,
    @GetUser() tuser: User,
  ): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto, tuser); // <-- passing values from the ui body request.
  }

  @Delete('/:id')
  public async deleteTrip(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tripsService.deleteTrip(id);
  }
}
