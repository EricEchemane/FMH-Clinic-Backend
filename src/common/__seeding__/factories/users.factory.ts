import { Faker } from '@faker-js/faker';
import { User, UserRole } from '../../user/entities';
import { setSeederFactory } from 'typeorm-extension';
import * as argon from 'argon2';

export const UsersFactory = setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  user.role = UserRole.customer;
  user.hash = await argon.hash('password');
  return user;
});
