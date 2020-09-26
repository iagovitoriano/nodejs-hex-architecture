import * as Yup from 'yup';

import * as httpResponse from '../helpers/httpResponse';

export default class UserController {
  constructor(userInteractor) {
    this.userInteractor = userInteractor;

    return this;
  }

  async handle(httpRequest) {
    try {
      const { method } = httpRequest;

      const payload = await this[method](httpRequest);

      return payload;
    } catch (err) {
      return httpResponse.notImplemented('Method not implemented.');
    }
  }

  async findAll() {}

  async store(httpRequest) {
    try {
      await this.userInteractor.store(httpRequest.body);

      return httpResponse.created();
    } catch (err) {
      if (err instanceof Yup.ValidationError)
        return httpResponse.unprocessableEntity('Invalid schema.');

      return httpResponse.internalServerError('Internal server error.');
    }
  }

  async findOne() {}

  async update() {}

  async delete() {}
}
