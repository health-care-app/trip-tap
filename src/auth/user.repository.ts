import * as bcrypt from 'bcrypt';

import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, getManager, Repository, UpdateResult } from 'typeorm';

import { ErrorConstraint } from '../enums/constraints.enum';
import { UserType } from '../enums/user-type.enum';
import { Params } from '../models/params.model';
import { UserResponseDto } from './dto/response/user.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async validateUserPassword(signInCredentialsDto: SignInCredentialsDto): Promise<UserResponseDto> {
    let userCredentials: Partial<User> = {};
    const { username, email, phoneNumber, password }: SignInCredentialsDto = signInCredentialsDto;

    if (!phoneNumber && !email) {
      userCredentials = { username };
    }

    if (!phoneNumber && !username) {
      userCredentials = { email };
    }

    if (!username && !email) {
      userCredentials = { phoneNumber };
    }

    const user: User = await this.findOne(userCredentials);

    if (user && await user.validatePassword(password)) {
      return new UserResponseDto(user);
    }

    return null;
  }

  public async approveCustomer(
    id: number,
    user: User,
  ): Promise<UserResponseDto> {
    if (user.userType === UserType.admin) {
      const updateResult: UpdateResult = await this.createQueryBuilder()
        .update(User)
        .set({ approved: true })
        .where({ id })
        .execute();

      if (updateResult.affected === 1) {
        user.approved = true;

        return new UserResponseDto(user);
      }

      throw new InternalServerErrorException();
    }

    throw new UnauthorizedException('Only Admins can approve a user.');
  }

  public async getAllTripOrganizers(
    user: User,
    params: Params,
  ): Promise<UserResponseDto[]> {
    if (user.userType === UserType.admin) {
      let users: User[];

      switch (params.approved) {
        case 'true':
          users = await this.find({ where: { userType: UserType.tripOrganizer, approved: true } });
          break;
        case 'false':
          users = await this.find({ where: { userType: UserType.tripOrganizer, approved: false } });
          break;
        default:
          users = await this.find({ where: { userType: UserType.tripOrganizer } });
      }

      return users.map((fetchedUser: User): UserResponseDto => new UserResponseDto(fetchedUser));
    }

    throw new UnauthorizedException('Only admins can get users information.');
  }

  public static async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<UserResponseDto> {
    const salt: string = await bcrypt.genSalt();

    const user: User = new User(
      {
        ...signUpCredentialsDto,
        password: await UserRepository.hashPassword(signUpCredentialsDto.password, salt),
      },
      salt,
    );

    try {
      await user.save();
    } catch (error) {
      if (error.constraint === ErrorConstraint.emailError) {
        throw new ConflictException('Email already exists.');
      }
      if (error.constraint === ErrorConstraint.usernameError) {
        throw new ConflictException('Username already exists.');
      }
      if (error.constraint === ErrorConstraint.numberError) {
        throw new ConflictException('Phone Number already exists.');
      }
      if (error.constraint === ErrorConstraint.instagramId) {
        throw new ConflictException('Instagram ID already exists.');
      }
      if (error.constraint === ErrorConstraint.facebookId) {
        throw new ConflictException('facebook ID already exists.');
      }

      throw new InternalServerErrorException();
    }

    return new UserResponseDto(user);
  }

  private static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
