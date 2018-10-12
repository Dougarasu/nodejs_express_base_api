// server.js
import express from 'express';
import mongoose from 'mongoose';
import bootstrap from './libs/bootstrap';
import { urlencoded, json } from 'body-parser';
import apiRoutes from './routes/api';
import versionConfig from './config/version.config';

// get environment and set it before starting the server services
console.log(`Using \'${process.env.environment}\' environment`);

Promise.all([
  import(`./environments/env.${process.env.environment}`),
]).then(([
  config
]) => {
  const versionPath = `/api/${versionConfig.version}`;
  const app = express();

  // setup the server
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(versionPath, apiRoutes);
  app.set('config', config.default);

  // connect the database
  mongoose.connect(config.default.database_url, { useNewUrlParser: true });

  const port = process.env.PORT || config.default.port

  // run the initial seeder
  bootstrap.init(config.default)
    .then(() => {
      app.listen(port);
      console.log('Server running at port: ' + port);
    });

});
