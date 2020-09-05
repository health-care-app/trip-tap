import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@Config/typeorm.config';

import { AuthModule } from './auth/auth.module';
import { TripRepository } from './trips/trip.repository';
import { TripsModule } from './trips/trips.module';
import { TripsService } from './trips/trips.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TripsModule,
    AuthModule,
  ],
  providers: [
    TripsService,
    TripRepository,
  ],
})
export class AppModule {
}
