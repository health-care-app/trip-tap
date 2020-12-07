import * as bcrypt from 'bcrypt';

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { UserType } from '../enums/user-type.enum';
import { Trip } from '../trips/trip.entity';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

@Entity()
@Unique(['username'])
@Unique(['email'])
@Unique(['phoneNumber'])
@Unique(['instagramId'])
@Unique(['facebookId'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  // tslint:disable-next-line: typedef
  @OneToMany(type => Trip, trip => trip.user, { eager: false })
  public trips: Trip[];

  @Column()
  public userType: string;

  @Column({ nullable: true })
  public username: string;

  @Column()
  public email: string;

  @Column()
  public approved: boolean;

  @Column({ nullable: true })
  public phoneNumber: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public facebookId: string;

  @Column({ nullable: true })
  public instagramId: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column('date', { nullable: true })
  public dateOfBirth: Date;

  @Column({ nullable: true })
  public gender: string;

  @Column({ nullable: true })
  public country: string;

  @Column({ nullable: true })
  public city: string;

  @Column({ nullable: true })
  public homeAddress: string;

  @Column()
  public salt: string;

  public constructor(signUpCredentialsDto?: SignUpCredentialsDto, salt?: string) {
    super();

    if (signUpCredentialsDto) {
      const userType: UserType = signUpCredentialsDto.isTripOrganizer ? UserType.tripOrganizer : UserType.customer;
      const isTripOrganizer: boolean = userType === UserType.tripOrganizer;

      this.username = signUpCredentialsDto.username;
      this.email = signUpCredentialsDto.email;
      this.approved = !signUpCredentialsDto.isTripOrganizer;
      this.firstName = signUpCredentialsDto.firstName;
      this.lastName = signUpCredentialsDto.lastName;
      this.dateOfBirth = signUpCredentialsDto.dateOfBirth;
      this.gender = signUpCredentialsDto.gender;
      this.country = signUpCredentialsDto.country;
      this.city = signUpCredentialsDto.city;
      this.homeAddress = signUpCredentialsDto.homeAddress;
      this.salt = salt;
      this.password = signUpCredentialsDto.password;
      this.userType = userType;
      this.phoneNumber = isTripOrganizer && signUpCredentialsDto.phoneNumber || null;
      this.instagramId = isTripOrganizer && signUpCredentialsDto.instagramId || null;
      this.facebookId = isTripOrganizer && signUpCredentialsDto.facebookId || null;
    }
  }

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return (hash === this.password);
  }
}
