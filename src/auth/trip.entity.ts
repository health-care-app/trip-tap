import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { User } from './user.entity';
import { CustomerTrip } from './customer-trip.entity';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(type => User, user => user.trips, { eager: false })
  public user: User;

  @Column()
  public userId: number;

  @OneToMany(type => CustomerTrip, customerTrip => customerTrip.trip, { eager: true })
  public customerTrips: CustomerTrip[];

}
