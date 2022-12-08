import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { PetServices, ScheduleStatus } from '../types';

export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  petName: string;

  @Column({
    type: 'enum',
    enum: PetServices,
  })
  service: PetServices;

  @Column()
  concern: string;

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
  })
  status: ScheduleStatus;

  @Column()
  archived: boolean;
}
