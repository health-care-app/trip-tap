import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user: string;
}