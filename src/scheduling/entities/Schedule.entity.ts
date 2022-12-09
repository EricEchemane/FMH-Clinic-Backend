import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PetServices, ScheduleStatus } from '../types';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  iso_date: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  pet_name: string;

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
    default: ScheduleStatus.pending,
  })
  status: ScheduleStatus;

  @Column({ default: false })
  archived: boolean;
}
