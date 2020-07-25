import { Module } from '@nestjs/common';

import { TripsModule } from './trips/trips.module';
import { TripsService } from './trips/trips.service';

@Module({
  imports: [
    TripsModule,
  ],
  providers: [
    TripsService,
  ],
})
export class AppModule {
}
