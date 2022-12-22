import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  rating: number;

  @Column()
  message: string;

  @Column({ default: false })
  is_published: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
