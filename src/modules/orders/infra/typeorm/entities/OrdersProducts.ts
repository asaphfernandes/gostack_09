import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ColumnNumericTransformer from '@shared/infra/typeorm/transfomers/ColumnNomericTransformer';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  order_id: string;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('uuid')
  product_id: string;

  @ManyToOne(() => Product, (product) => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('numeric', { precision: 9, scale: 2, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
