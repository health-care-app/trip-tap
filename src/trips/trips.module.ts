import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { TripRepository } from '../trips/trip.repository';
import { CustomerTripsController } from './customer.trips.controller';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TripRepository]),
  ],
  controllers: [
    CustomerTripsController,
    TripsController,
  ],
  providers: [TripsService],
})
export class TripsModule {
}
