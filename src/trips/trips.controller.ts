import { Controller, Get } from '@nestjs/common';

import { Trip } from '@Auth/trip.entity';

import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {

    public constructor(
        private readonly tripsService: TripsService,
    ) { }

    @Get()
    public async getAllTrips(): Promise<Trip[]> {
        return this.tripsService.getAllTrips();
    }
}
