import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripRepository } from '@Auth/trip.repository';

import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
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
    AdminController,
  ],
  providers: [TripsService],
})
export class TripsModule {
}
