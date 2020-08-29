import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';
import { Trip } from '@Auth/trip.entity';
import { User } from '@Auth/user.entity';

import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';
import { UserType } from 'src/enums/user-type.enum';

@UseGuards(AuthGuard())
@Controller('trips')
export class TripsController {

    public constructor(
        private readonly tripsService: TripsService,
    ) { }

    @Get()
    public async getAllTrips(): Promise<Trip[]> {
        return this.tripsService.getAllTrips();
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
