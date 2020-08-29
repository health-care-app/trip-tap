import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {

    const { username, password, email, phoneNumber, firstName, lastName, dateOfBirth, gender,
            country, city, homeAddress, userType }: SignUpCredentialsDto = signUpCredentialsDto;

    const user: User = new User();
    user.userType = userType;
    user.username = username;
    user.email = email;
    user.approved = false;
    user.phoneNumber = phoneNumber;
    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;
    user.country = country;
    user.city = city;
    user.homeAddress = homeAddress;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') {
        throw new ConflictException('Email already exists.');
      }
      if (error.constraint === 'UQ_78a916df40e02a9deb1c4b75edb') {
        throw new ConflictException('Username already exists.');
      }
      if (error.constraint === 'UQ_c1756d987198666d8b02af03439') {
        throw new ConflictException('Phone Number already exists.');
      }
      // tslint:disable-next-line: no-console
      console.log(error);
      throw new InternalServerErrorException();
    }
    delete user.password;
    delete user.salt;

    return user;
  }

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
        // tslint:disable-next-line: no-console
        console.log(user.username);
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    return null;
  }

  // tslint:disable-next-line: prefer-function-over-method
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
