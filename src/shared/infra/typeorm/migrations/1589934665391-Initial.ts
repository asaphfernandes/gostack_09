import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

class Initial1589934665391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Products',
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
      name: 'Orders',
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
      name: 'OrdersProducts',
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
      name: 'Customers',
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

    await queryRunner.createForeignKey('Orders', new TableForeignKey({
      name: 'fk_orders_customer_id',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Customers',
      onDelete: 'RESTRICT',
    }));

    await queryRunner.createForeignKey('OrdersProducts', new TableForeignKey({
      name: 'fk_orders_products_order_id',
      columnNames: ['order_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Orders',
      onDelete: 'RESTRICT',
    }));
    await queryRunner.createForeignKey('OrdersProducts', new TableForeignKey({
      name: 'fk_orders_products_product_id',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Products',
      onDelete: 'RESTRICT',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('OrdersProducts', 'fk_orders_products_order_id');
    await queryRunner.dropForeignKey('OrdersProducts', 'fk_orders_products_product_id');
    await queryRunner.dropForeignKey('Orders', 'fk_orders_customer_id');

    await queryRunner.dropTable('OrdersProducts');
    await queryRunner.dropTable('Orders');
    await queryRunner.dropTable('Products');
    await queryRunner.dropTable('Customers');
  }
}

export default Initial1589934665391;
