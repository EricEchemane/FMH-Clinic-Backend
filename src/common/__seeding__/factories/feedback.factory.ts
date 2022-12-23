import { Faker } from '@faker-js/faker';
import { Feedback } from '../../../feedback/entities';
import { setSeederFactory } from 'typeorm-extension';

export const FeedbackFactory = setSeederFactory(
  Feedback,
  async (faker: Faker) => {
    const feedback = new Feedback();
    feedback.message = faker.lorem.sentence();
    feedback.rating = faker.datatype.number({ min: 1, max: 5 });
    feedback.is_published = faker.datatype.boolean();
    return feedback;
  },
);
