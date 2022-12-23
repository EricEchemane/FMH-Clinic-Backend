import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { ProductsFactory, schedulesFactory, UsersFactory } from './factories';
import MainSeeder from './main.seeder';
import { preview } from './preview';

import { Feedback } from '../../feedback/entities';
import { Schedule } from '../../scheduling/entities';
import { User } from '../../user/entities';
import { Product } from '../../product/entities';
import { FeedbackFactory } from './factories/feedback.factory';
import { Service } from '../../service/entities';

const local: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '19126222',
  database: 'fmh_clinic',
  entities: [User, Schedule, Product, Feedback, Service],
  factories: [UsersFactory, schedulesFactory, ProductsFactory, FeedbackFactory],
  seeds: [MainSeeder],
};

const options = process.env.NODE_ENV === 'preview_seed' ? preview : local;

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
