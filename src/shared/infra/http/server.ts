import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server started in port ${process.env.PORT} !`);
    });
  })
  .catch(() => {
    console.log(`Server has a error`);
  });
