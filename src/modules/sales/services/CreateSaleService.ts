import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Sale from '@modules/sales/entities/Sale';
import Partner from '@modules/partners/entities/Partner';
import ICreateSaleServiceDTO from '../dtos/ICreateSaleServiceDTO';

class CreateSaleService {
  public async execute(saleData: ICreateSaleServiceDTO): Promise<Sale | null> {

    await this.checkPartner(saleData, 'customer');

    await this.checkPartner(saleData, 'seller');

    const salesRepository = getRepository(Sale);

    saleData.order = await this.setOrderNumber();

    const sale = salesRepository.create(saleData);

    await salesRepository.save(sale);

    return sale;

  }

  private async checkPartner(saleData: ICreateSaleServiceDTO, type: 'customer' | 'seller'): Promise<Partner | null> {

    const id = type === 'customer' ? saleData.customer.id : saleData.seller.id;

    const partner = await getRepository(Partner).findOne({
      where: {
        id,
        type
      }
    });

    if (!partner) {
      throw new AppError(`${type} does not exist.`, 400);
    }

    return partner;

  }

  private async setOrderNumber(): Promise<number> {

    const salesRepository = getRepository(Sale);

    let lastOrder = await salesRepository.find({
      order: {
        order: 'DESC',
      }
    });

    return !lastOrder.length ? 1 : lastOrder[0].order + 1;

  }

}

export default CreateSaleService;