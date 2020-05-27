import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('IOrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('IProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ICustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('The customer was not found.');
    }

    const productIds = products.map((product) => product.id);
    const dbProducts = await this.productsRepository.findAllById(productIds);
    const updateProducts: IUpdateProductsQuantityDTO[] = [];
    const createProducts = products.map((product) => {
      const dbProduct = dbProducts.find((w) => w.id === product.id);

      if (!dbProduct) {
        throw new AppError('There are one or more products that were not found.');
      }

      if (dbProduct.quantity < product.quantity) {
        throw new AppError('There are one or more products that quantity is greater than of stock.');
      }

      updateProducts.push({ id: dbProduct.id, quantity: dbProduct.quantity - product.quantity });

      return {
        product_id: dbProduct.id,
        price: dbProduct.price,
        quantity: product.quantity,
      };
    });

    this.productsRepository.updateQuantity(updateProducts);
    const order = this.ordersRepository.create({ customer, products: createProducts });

    return order;
  }
}

export default CreateProductService;
