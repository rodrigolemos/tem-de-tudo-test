import { getRepository } from 'typeorm';

import IReportsServiceDTO from '../dtos/IReportsServiceDTO';
import Sale from '../entities/Sale';

class ListPeriodService {
  public async execute({ starts, finishes }: IReportsServiceDTO): Promise<Sale[] | null> {

    const listPeriod = await getRepository(Sale)
      .createQueryBuilder('sales')
      .select('date, SUM(sale_price) as total')
      .where('date BETWEEN :starts AND :finishes ', {
        starts: starts,
        finishes: finishes,
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return listPeriod;

  }
}

export default ListPeriodService;