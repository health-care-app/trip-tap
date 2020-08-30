import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Trip } from '../trips/trip.entity';

@Entity()
export class CustomerTrip extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    // tslint:disable-next-line: typedef
    @ManyToOne(type => Trip, trip => trip.customerTrips, { eager: false })
    public trip: Trip;

    @Column()
    public tripId: number;
}
