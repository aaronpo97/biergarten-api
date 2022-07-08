// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import { RawFakeUserData } from './types/index';

const generateUserData = (userCount: number): RawFakeUserData[] => {
  const fakeUsers: RawFakeUserData[] = [];

  for (let i = 0; i < userCount; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const dateOfBirth = faker.date.birthdate({ mode: 'age', min: 19 });
    const username = `${firstName}.${lastName}${dateOfBirth
      .getUTCFullYear()
      .toString()
      .slice(2)}`.toLowerCase();
    const email = `${username}@${faker.internet.domainName()}`.toLowerCase();

    fakeUsers.push({
      dateOfBirth: dateOfBirth.toISOString(),
      username,
      email,
      firstName,
      lastName,
    });
  }

  return fakeUsers;
};

export default generateUserData;
