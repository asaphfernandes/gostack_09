import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

class Initial1589934665391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'quantity',
          type: 'numeric',
        },
        {
          name: 'price',
          type: 'numeric',
          precision: 9,
          scale: 2,
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'orders',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'customer_id',
          type: 'uuid',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'orders_products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'order_id',
          type: 'uuid',
        },
        {
          name: 'product_id',
          type: 'uuid',
        },
        {
          name: 'price',
          type: 'numeric',
          precision: 9,
          scale: 2,
        },
        {
          name: 'quantity',
          type: 'numeric',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'customers',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey('orders', new TableForeignKey({
      name: 'fk_orders_customer_id',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'RESTRICT',
    }));

    await queryRunner.createForeignKey('orders_products', new TableForeignKey({
      name: 'fk_orders_products_order_id',
      columnNames: ['order_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'orders',
      onDelete: 'RESTRICT',
    }));
    await queryRunner.createForeignKey('orders_products', new TableForeignKey({
      name: 'fk_orders_products_product_id',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'RESTRICT',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'fk_orders_products_order_id');
    await queryRunner.dropForeignKey('orders_products', 'fk_orders_products_product_id');
    await queryRunner.dropForeignKey('orders', 'fk_orders_customer_id');

    await queryRunner.dropTable('orders_products');
    await queryRunner.dropTable('orders');
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('customers');
  }
}

export default Initial1589934665391;
