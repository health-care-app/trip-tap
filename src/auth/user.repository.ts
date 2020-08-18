import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {

    const { username, password, email, phonenumber, firstname, lastname, dateofbirth, gender,
      country, city, homeaddress }: AuthCredentialsDto = authCredentialsDto;

    const user: User = new User();

    user.username = username;
    user.email = email;
    user.phonenumber = phonenumber;
    user.firstname = firstname;
    user.lastname = lastname;
    user.dateofbirth = dateofbirth;
    user.gender = gender;
    user.country = country;
    user.city = city;
    user.homeaddress = homeaddress;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') {
        throw new ConflictException('Email already exists.');
      } else
        if (error.constraint === 'UQ_78a916df40e02a9deb1c4b75edb') {
          throw new ConflictException('Username already exists.');
        } else
          if (error.constraint === 'UQ_c1756d987198666d8b02af03439') {
            throw new ConflictException('Phone Number already exists.');
          }
      throw new InternalServerErrorException();
    }
    delete user.password;
    delete user.salt;

    return user;
  }

  public async validateUserPassword(loginCredentialsDTO: LoginCredentialsDTO): Promise<User> {
    const { username, email, phonenumber, password }: LoginCredentialsDTO = loginCredentialsDTO;

    if (!phonenumber && !email) {
      const user: User = await this.findOne({ username });
      if (user && await user.validatePassword(password)) {
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    if (!phonenumber && !username) {
      const user: User = await this.findOne({ email });
      if (user && await user.validatePassword(password)) {
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    if (!username && !email) {
      const user: User = await this.findOne({ phonenumber });
      if (user && await user.validatePassword(password)) {
        console.log(user.username);
        delete user.password;
        delete user.salt;

        return user;
      }
    }

    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
