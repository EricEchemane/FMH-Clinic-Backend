import { Faker } from '@faker-js/faker';
import { PetServices, ScheduleStatus } from '../../scheduling/types';
import { setSeederFactory } from 'typeorm-extension';
import { Schedule } from '../../scheduling/entities';

export const schedulesFactory = setSeederFactory(
  Schedule,
  async (faker: Faker) => {
    const schedule = new Schedule();
    // schedule.date = generateRandomDate();
    schedule.date = faker.date.between(
      new Date(2022, 12, 1),
      new Date(2022, 12, 31),
    );
    schedule.pet_name = faker.name.firstName();
    schedule.service = faker.helpers.arrayElement([
      PetServices.grooming,
      PetServices.others,
      PetServices.vet_consultation,
    ]);
    schedule.concern = faker.lorem.sentence();
    schedule.status = faker.helpers.arrayElement([
      ScheduleStatus.cancelled,
      ScheduleStatus.done,
      ScheduleStatus.pending,
    ]);
    schedule.archived = faker.helpers.arrayElement([true, false]);
    return schedule;
  },
);

// function generateRandomDate() {
//   const date = new Date();
//   const month = date.getMonth();
//   const year = date.getFullYear();
//   const day = getRandomInt(1, 28);
//   return new Date(year, month, day);
// }

// export function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
