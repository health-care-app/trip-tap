import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { User } from './user.entity';
import { AccessToken } from 'src/token/access-token.interface';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<AccessToken> {
    const user = await this.userRepository.signUp(authCredentialsDto);

    const payload:JwtPayload = { profile: user };
    const accessToken: string = this.jwtService.sign(payload);
    return { accessToken };
  }

  public async signIn(loginCredentialsDTO: LoginCredentialsDTO): Promise<AccessToken> {
    const user = await this.userRepository.validateUserPassword(loginCredentialsDTO);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload:JwtPayload = { profile: user };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
