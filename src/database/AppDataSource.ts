import { DataSource } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import Beer from './model/Beer';
import Brewery from './model/Brewery';
import User from './model/User';

import Profile from './model/Profile';
import BeerComment from './model/BeerComment';

dotenv.config();
const {
  DATABASE_HOST: host,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
  DATABASE_PORT,
  DATABASE_NAME: database,
} = process.env;

const type = 'postgres';
const port = parseInt(DATABASE_PORT as string, 10);

const AppDataSource = new DataSource({
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [Beer, Brewery, User, Profile, BeerComment],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
