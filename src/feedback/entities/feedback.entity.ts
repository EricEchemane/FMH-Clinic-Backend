import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.feedbacks)
  @JoinColumn()
  user: User;
}
