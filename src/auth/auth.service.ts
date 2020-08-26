import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { User } from './user.entity';
import { AccessToken } from 'src/token/access-token.interface';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<AccessToken> {

    const user: User = await this.userRepository.signUp(signUpCredentialsDto);
    const payload: JwtPayload = { profile: user };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }

  public async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<AccessToken> {
    
    const user: User = await this.userRepository.validateUserPassword(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { profile: user };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
