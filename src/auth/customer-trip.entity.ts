import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Trip } from './trip.entity';

@Entity()
export class CustomerTrip extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Trip, trip => trip.customerTrips, { eager: false })
    public trip: Trip;

    @Column()
    public tripId: number;
}
