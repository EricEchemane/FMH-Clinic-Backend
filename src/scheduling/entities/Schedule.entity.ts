import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleStatus } from '../types';

@Entity()
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
  pet_name: string;

  @Column({})
  service: string;

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
