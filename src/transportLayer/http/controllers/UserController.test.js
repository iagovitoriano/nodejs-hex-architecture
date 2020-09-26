import faker from 'faker';

import UserController from './UserController';
import { InternalServerError, NotImplemented } from '../helpers/errors';

const makeSut = () => {
  class UserInteractorStub {
    async store() {
      return true;
    }
  }

  const userInteractorStub = new UserInteractorStub();
  const sut = new UserController(userInteractorStub);

  return {
    sut,
    userInteractorStub,
  };
};

describe('User controller', () => {
  describe('POST', () => {
    test('should return 201 if schema is valid and entity is created', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        method: 'store',
        body: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          age: faker.random.number(),
        },
      };

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(201);
      expect(httpResponse.body).toBeUndefined();
    });

    test('should return 500 if no interactor is provided', async () => {});

    test('should return 500 if interactor not has store method', async () => {});

    test('should return 500 if interactor method post throws error', async () => {
      const { sut, userInteractorStub } = makeSut();

      jest.spyOn(userInteractorStub, 'store').mockImplementation(() => {
        throw new Error();
      });

      const httpRequest = {
        method: 'store',
        body: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          age: faker.random.number(),
        },
      };

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toBeInstanceOf(InternalServerError);
      expect(httpResponse.body.message).toBe('Internal server error.');
    });

    test('should return 501 if method not exists', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        method: faker.random.word(),
        body: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          age: faker.random.number(),
        },
      };

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(501);
      expect(httpResponse.body).toBeInstanceOf(NotImplemented);
      expect(httpResponse.body.message).toBe('Method not implemented.');
    });
  });
});
