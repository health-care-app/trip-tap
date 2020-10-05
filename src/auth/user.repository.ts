import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, getManager, Repository } from 'typeorm';

import { ErrorConstraint } from '../enums/constraints.enum';
import { UserType } from '../enums/user-type.enum';
import { Params } from '../models/params.model';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async validateUserPassword(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    const { username, email, phoneNumber, password }: SignInCredentialsDto = signInCredentialsDto;

    if (!phoneNumber && !email) {
      const user: User = await this.findOne({ username });
      if (user && await user.validatePassword(password)) {
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    if (!phoneNumber && !username) {
      const user: User = await this.findOne({ email });
      if (user && await user.validatePassword(password)) {
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    if (!username && !email) {
      const user: User = await this.findOne({ phoneNumber });
      if (user && await user.validatePassword(password)) {
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    return null;
  }

  public async approveCustomer(
    id: number,
    user: User,
  ): Promise<User> {
    if (user.userType === UserType.admin) {
      await this.createQueryBuilder()
        .update(User)
        .set({ approved: true })
        .where({ id })
        .execute();

      const approvedUser: User = await getManager()
        .createQueryBuilder(User, 'user')
        .where({ id })
        .getOne();

      return approvedUser;
    }
    throw new UnauthorizedException('Only Admins can approve a user.');
  }

  public static async getAllTripOrganizers(
    user: User,
    params: Params,
  ): Promise<User[]> {
    if (user.userType === UserType.admin) {
      let users: User[];

      if (params.approved === 'true') {
        users = await getManager()
          .createQueryBuilder(User, 'user')
          .where({ userType: UserType.tripOrganizer, approved: true })
          .getMany();

        return users;
      }

      if (params.approved === 'false') {
        users = await getManager()
          .createQueryBuilder(User, 'user')
          .where({ userType: UserType.tripOrganizer, approved: false })
          .getMany();

        return users;
      }
      users = await getManager()
        .createQueryBuilder(User, 'user')
        .getMany();

      return users;
    }
    throw new UnauthorizedException('Only admins can get users information.');
  }

  public static async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    const user: User = new User();
    user.userType = signUpCredentialsDto.isTripOrganizer ? UserType.tripOrganizer : UserType.customer;

    if (user.userType === UserType.tripOrganizer) {
      user.facebookId = signUpCredentialsDto.facebookId;
      user.instagramId = signUpCredentialsDto.instagramId;
    }

    user.username = signUpCredentialsDto.username;
    user.email = signUpCredentialsDto.email;
    user.approved = !signUpCredentialsDto.isTripOrganizer;
    user.phoneNumber = signUpCredentialsDto.phoneNumber;
    user.firstName = signUpCredentialsDto.firstName;
    user.lastName = signUpCredentialsDto.lastName;
    user.dateOfBirth = signUpCredentialsDto.dateOfBirth;
    user.gender = signUpCredentialsDto.gender;
    user.country = signUpCredentialsDto.country;
    user.city = signUpCredentialsDto.city;
    user.homeAddress = signUpCredentialsDto.homeAddress;
    user.salt = await bcrypt.genSalt();
    user.password = await UserRepository.hashPassword(signUpCredentialsDto.password, user.salt);

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
    delete user.password;
    delete user.salt;

    return user;
  }

  private static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
