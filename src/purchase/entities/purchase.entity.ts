import { Product } from 'src/product/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'float' })
  total_price: number;

  @Column({ default: false })
  archived: boolean;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
