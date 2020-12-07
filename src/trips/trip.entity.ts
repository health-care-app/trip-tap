import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CustomerTrip } from '../auth/customer-trip.entity';
import { User } from '../auth/user.entity';
import { Currency } from '../enums/currency.enum';
import { Level } from '../enums/level.enum';
import { CreateTripDto } from './dto/create-trip.dto';

@Entity()
export class Trip extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  // tslint:disable-next-line: typedef
  @ManyToOne(type => User, user => user.trips, { eager: true })
  public user: User;

  @Column()
  public userId: number;

  @Column()
  public name: string;

  // tslint:disable-next-line: typedef
  @OneToMany(type => CustomerTrip, customerTrip => customerTrip.trip, { eager: false })
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

  @Column('float')
  public duration: number;

  @Column()
  public level: Level;

  @Column('integer', { array: true })
  public availableDates: number[];

  @Column('text', { array: true, nullable: true })
  public tags: string[];

  public constructor(createTripDto?: CreateTripDto, userId?: number) {
    super();

    if (createTripDto) {
      this.userId = userId;
      this.name = createTripDto.name;
      this.active = true;
      this.image = createTripDto.image;
      this.description = createTripDto.description;
      this.comments = createTripDto.comments;
      this.location = createTripDto.location;
      this.amenities = createTripDto.amenities;
      this.material = createTripDto.material;
      this.startTime = createTripDto.startTime;
      this.including = createTripDto.including;
      this.dogFriendly = createTripDto.dogFriendly;
      this.price = createTripDto.price;
      this.currency = createTripDto.currency;
      this.duration = createTripDto.duration;
      this.level = createTripDto.level;
      this.availableDates = createTripDto.availableDates;
      this.tags = createTripDto.tags;
    }
  }
}
