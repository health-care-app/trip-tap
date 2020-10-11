import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Trip } from '../trips/trip.entity';

import * as bcrypt from 'bcrypt';

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
  @OneToMany(type => Trip, trip => trip.user, { eager: true })
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

  

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return (hash === this.password);
  }
}
