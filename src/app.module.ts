import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@Config/typeorm.config';

import { TripsModule } from './trips/trips.module';
import { TripsService } from './trips/trips.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TripsModule,
    AuthModule,
  ],
  providers: [
    TripsService,
  ],
})
export class AppModule {
}
