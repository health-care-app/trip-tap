import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripRepository } from '@Auth/trip.repository';

import { AuthModule } from '../auth/auth.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TripRepository]),
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {
}
