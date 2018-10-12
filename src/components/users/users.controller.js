import { userModel } from './users.model';
import errorHandler from '../../libs/error-handler';
import usersService from './users.service';

export default {

  async all(req, res, next) {
    try {
      const users = await usersService.getAll(req.query.type);
      res.status(200).send(users);
    } catch (error) {
      errorHandler(error, req, res);
    }
  },

  async get(req, res, next) {
    try {
      const user = await usersService.getById(req.params.user_id);
      res.status(200).send(user);
    } catch (error) {
      errorHandler(error, req, res);
    }
  },

  async insert(req, res, next) {
    const config = req.app.get('config');

    try {
      const user = await usersService.add(req.body, config.key);
      res.status(200).send(user);
    } catch (error) {
      errorHandler(error, req, res);
    }
  },


  async delete(req, res, next) {
    try {
      await usersService.removeById(req.params.user_id)
      res.status(200).send({ message: `User ${req.params.user_id} deleted.`});
    } catch (error) {
      errorHandler(error, req, res);
    }
  },

  async update(req, res, next) {
    try {
      const user = await usersService.updateById(req.params.user_id, req.body)
      res.status(200).send(user);
    } catch (error) {
      errorHandler(error, req, res);
    }
  },

}
