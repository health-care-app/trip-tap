import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CustomerTrip } from '../auth/customer-trip.entity';
import { User } from '../auth/user.entity';
import { Currency } from '../enums/currency.enum';
import { Level } from '../enums/level.enum';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  // tslint:disable-next-line: typedef
  @ManyToOne(type => User, user => user.trips, { eager: false })
  public user: User;

  @Column()
  public userId: number;

  @Column()
  public name: string;


  // tslint:disable-next-line: typedef
  @OneToMany(type => CustomerTrip, customerTrip => customerTrip.trip, { eager: true })
  public customerTrips: CustomerTrip[];

  @Column()
  public active: boolean;

  @Column({ nullable: true })
  public image: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public comments: string;

  @Column()
  public location: string;

  @Column()
  public amenities: string;

  @Column()
  public material: string;

  @Column()
  public startTime: number;

  @Column()
  public including: string;

  @Column()
  public dogFriendly: boolean;

  @Column()
  public price: number;

  @Column()
  public currency: Currency;

  @Column()
  public duration: number;

  @Column()
  public level: Level;

  @Column('text', { array: true })
  public availableDates: string[];

  @Column('text', { array: true, nullable: true })
  public tags: string[];
}
