import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  unit_price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column()
  image_url: string;

  @Column({ default: false })
  archived: boolean;
}
