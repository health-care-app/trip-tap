import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CustomerTrip } from '../auth/customer-trip.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  // tslint:disable-next-line: typedef
  @ManyToOne(type => User, user => user.trips, { eager: false })
  public user: User;

  @Column()
  public userId: number;

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
  public date: Date;
}
