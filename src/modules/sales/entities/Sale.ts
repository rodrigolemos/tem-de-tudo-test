import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Product from '@modules/products/entities/Product';
import Partner from '@modules/partners/entities/Partner';

@Entity('sales')
class Sale {
  @PrimaryColumn('integer')
  order: number;

  @PrimaryColumn('integer')
  @OneToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @Column('integer')
  quantity: number;

  @Column('float')
  cost_price: number;

  @Column('float')
  sale_price: number;

  @OneToOne(() => Partner, partner => partner.id, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Partner;

  @OneToOne(() => Partner, partner => partner.id, { eager: true })
  @JoinColumn({ name: 'seller_id' })
  seller: Partner;

  @Column('date')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sale;