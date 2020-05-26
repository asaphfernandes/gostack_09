import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

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
    const createProducts = dbProducts.map(({ id, price }) => {
      const findProduct = products.find((product) => product.id === id);
      const quantity = findProduct ? findProduct.quantity : 0;
      return { product_id: id, price, quantity };
    });

    const order = this.ordersRepository.create({ customer, products: createProducts });

    return order;
  }
}

export default CreateProductService;
