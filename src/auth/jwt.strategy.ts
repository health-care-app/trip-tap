import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
// tslint:disable-next-line: no-inferred-empty-object-type
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    // tslint:disable-next-line: typedef
    const { profile } = payload;
    const user: User = await this.userRepository.findOne({ email: profile.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
