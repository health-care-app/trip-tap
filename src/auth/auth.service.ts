import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AccessToken } from '../token/access-token.interface';
import { UserResponseDto } from './dto/response/user.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<AccessToken> {
    const user: UserResponseDto = await UserRepository.signUp(signUpCredentialsDto);
    const payload: JwtPayload = { profile: user };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }

  public async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<AccessToken> {
    const user: UserResponseDto = await this.userRepository.validateUserPassword(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { profile: user };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
