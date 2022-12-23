import { Faker } from '@faker-js/faker';
import { PetServices, ScheduleStatus } from '../../../scheduling/types';
import { setSeederFactory } from 'typeorm-extension';
import { Schedule } from '../../../scheduling/entities';

export const schedulesFactory = setSeederFactory(
  Schedule,
  async (faker: Faker) => {
    const schedule = new Schedule();
    schedule.date = faker.date.between(
      new Date(2022, 11, 1),
      new Date(2022, 11, 31),
    );
    schedule.pet_name = faker.name.firstName();
    schedule.service = faker.helpers.arrayElement([
      PetServices.Vaccination,
      PetServices.Deworming,
      PetServices.Treatment,
      PetServices.Confinement,
      PetServices.Ultrasound,
      PetServices.PetGrooming,
      PetServices.MinorSurgery,
      PetServices.XRay,
      PetServices.RapidTestKits,
      PetServices.ChecUp,
    ]);
    schedule.concern = faker.lorem.sentence();
    schedule.status = faker.helpers.arrayElement([
      ScheduleStatus.cancelled,
      ScheduleStatus.done,
      ScheduleStatus.pending,
    ]);
    return schedule;
  },
);
