import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TripRepository } from './trip.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TripRepository, UserRepository]),
    // TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
