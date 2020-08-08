import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public user: string;

  @ManyToOne(type => User, user => user.trips, { eager: false })
  public tuser: User;

  @Column()
  public tuserId: number;
}
