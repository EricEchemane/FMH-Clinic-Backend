import { Schedule } from '../../scheduling/entities';
import { User } from '../../user/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Product } from '../../product/entities';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const schedulesRepository = dataSource.getRepository(Schedule);

    const userFactory = factoryManager.get(User);
    const scheduleFactory = factoryManager.get(Schedule);
    const productsFactory = factoryManager.get(Product);

    const users = await userFactory.saveMany(30);
    await productsFactory.saveMany(50);

    const schedules = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const schedule = await scheduleFactory.make({
            email: faker.helpers.arrayElement(users).email,
            name: faker.helpers.arrayElement(users).name,
          });
          return schedule;
        }),
    );

    await schedulesRepository.save(schedules);
  }
}
