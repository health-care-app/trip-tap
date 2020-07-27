import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TripRepository } from './trip.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

  constructor(
    //injecting the UserRepository
    @InjectRepository(UserRepository) //<-- specifying the repository you want to inject

    //when the service is instantiated, the UserRepository instance will be injected into the userRepository prop.
    private userRepository: UserRepository,

    @InjectRepository(TripRepository)
    private tripRepository: TripRepository,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }
}
