import { Router } from 'express';
import userController from '../components/users/users.controller';

const routes = Router();

routes.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Content-Disposition');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

routes.options('/*', function (req, res, next) {
  res.send(200);
});

routes.get('/', function(req, res, next) {
  res.status(200).send({ hello: 'world' });
});

/**
 * Public routes
 */
routes.get('/users', userController.all);
routes.get('/users/:user_id', userController.get);
routes.post('/users', userController.insert);
routes.delete('/users/:user_id', userController.delete);
routes.patch('/users/:user_id', userController.update);

/**
 * Private routes (using authentication)
 */

export default routes;
