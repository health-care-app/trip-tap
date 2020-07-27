import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { TripRepository } from './trip.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

  constructor(
    //injecting the UserRepository
    @InjectRepository(UserRepository) //<-- specifying the repository you want to inject

    //when the service is instantiated, the UserRepository instance will be injected into the userRepository prop.
    private userRepository: UserRepository,
    private jwtService: JwtService,

    @InjectRepository(TripRepository)
    private tripRepository: TripRepository,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
