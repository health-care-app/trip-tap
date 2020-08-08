
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
  public async getAllTrips(@GetUser() tuser: User): Promise<Trip[]> {
    return this.tripsService.getAllTrips(tuser);
  }

  @Get('/:id')
  public async getTripById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() tuser: User,
    ): Promise<Trip> {
    return this.tripsService.getTripById(id, tuser);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTrip(
    @Body() createTripDto: CreateTripDto,
    @GetUser() tuser: User,
  ): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto, tuser);
  }

  @Delete('/:id')
  public async deleteTrip(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() tuser: User,
    ): Promise<void> {
    return this.tripsService.deleteTrip(id, tuser);
  }
}
