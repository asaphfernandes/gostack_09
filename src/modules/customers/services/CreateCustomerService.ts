import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('ICustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerWithSameEmail = await this.customersRepository.findByEmail(email);

    if (customerWithSameEmail) {
      throw new AppError('This email was registered to other customer.');
    }

    const customer = await this.customersRepository.create({ name, email });
    return customer;
  }
}

export default CreateCustomerService;
