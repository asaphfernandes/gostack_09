import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import ColumnNumericTransformer from '@shared/infra/typeorm/transfomers/ColumnNomericTransformer';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric', { precision: 9, scale: 2, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column('numeric')
  quantity: number;

  @OneToMany(() => OrdersProducts, (orderProduct) => orderProduct.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
