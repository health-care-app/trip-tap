import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TripRepository } from './trip.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(TripRepository)
    private tripRepository: TripRepository,
  ) { }

  async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(AuthCredentialsDto)
  }
}
