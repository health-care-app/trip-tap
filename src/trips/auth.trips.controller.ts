
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';
import { Trip } from '@Auth/trip.entity';

import { User } from '../auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';

@Controller('auth/trips')
@UseGuards(AuthGuard())
export class AuthTripsController {

  public constructor(
    private readonly tripsService: TripsService,
  ) { }

  @Get()
  public async getAllTrips(@GetUser() user: User): Promise<Trip[]> {
    return this.tripsService.authGetAllTrips(user);
  }

  @Get('/:id')
  public async getTripById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Trip> {
    return this.tripsService.getTripById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTrip(
    @Body() createTripDto: CreateTripDto,
    @GetUser() user: User,
  ): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto, user);
  }

  @Delete('/:id')
  public async deleteTrip(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tripsService.deleteTrip(id, user);
  }
}
