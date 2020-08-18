import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Trip } from './trip.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
@Unique(['phonenumber'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public phonenumber: string;

  @Column()
  public password: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column('date')
  public dateofbirth: Date;

  @Column({ nullable: true })
  public gender: string;

  @Column()
  public country: string;

  @Column({ nullable: true })
  public city: string;

  @Column({ nullable: true })
  public homeaddress: string;

  @Column()
  public salt: string;

  @OneToMany(type => Trip, trip => trip.user, { eager: true })
  public trips: Trip[];

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return (hash === this.password);
  }
}
