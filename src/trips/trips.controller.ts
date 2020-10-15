import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';
import { User } from '@Auth/user.entity';

import { Params } from '../models/params.model';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripResponseDto } from './response/trip.dto';
import { TripsService } from './trips.service';

@UseGuards(AuthGuard())
@Controller('trips')
export class TripsController {

  public constructor(
    private readonly tripsService: TripsService,
  ) {
  }

  @Get()
  public async getAllTrips(
    @GetUser() user: User,
    @Query() params: Params,
  ): Promise<TripResponseDto[]> {
    return this.tripsService.getAllTrips(user, params);
  }

  @Get('/:id')
  public async getTripById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TripResponseDto> {
    return this.tripsService.getTripById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  // tslint:disable-next-line: prefer-function-over-method
  public async createTrip(
    @Body() createTripDto: CreateTripDto,
    @GetUser() user: User,
  ): Promise<TripResponseDto> {
    return TripsService.createTrip(user, createTripDto);
  }

  @Delete('/:id')
  public async deleteTrip(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TripResponseDto> {
    return this.tripsService.deleteTrip(id, user);
  }
}
