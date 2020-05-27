import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });
    await this.ormRepository.save(product);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async findAllById(products: string[]): Promise<Product[]> {
    return this.ormRepository.find({ where: { id: In(products) } });
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productIds = products.map((product) => product.id);
    const dbProducts = await this.findAllById(productIds);

    products.forEach(async (product) => {
      const dbProduct = dbProducts.find((p) => p.id === product.id);

      if (!dbProduct) {
        throw new AppError('Update error', 500);
      }

      await this.ormRepository.update({ id: dbProduct.id }, product);
    });

    return dbProducts;
  }
}

export default ProductsRepository;
