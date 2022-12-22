import 'reflect-metadata';
import { Schedule } from '../scheduling/entities';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { ProductsFactory, schedulesFactory, UsersFactory } from './factories';
import MainSeeder from './main.seeder';
import { User } from '../user/entities';
import { preview } from './preview';
import { Product } from '../product/entities';

const local: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '19126222',
  database: 'fmh_clinic',
  entities: [User, Schedule, Product],
  factories: [UsersFactory, schedulesFactory, ProductsFactory],
  seeds: [MainSeeder],
};

const options = process.env.NODE_ENV === 'preview_seed' ? preview : local;

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
