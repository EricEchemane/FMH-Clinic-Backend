import { Faker } from '@faker-js/faker';
import { Product } from '../../product/entities';
import { setSeederFactory } from 'typeorm-extension';

export const ProductsFactory = setSeederFactory(
  Product,
  async (faker: Faker) => {
    const product = new Product();
    product.description = faker.commerce.productDescription();
    product.image_url = faker.image.business();
    product.name = faker.commerce.productName();
    product.stock = getRandomInt(10, 100);
    product.unit_price = Number(faker.commerce.price());
    return product;
  },
);

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
