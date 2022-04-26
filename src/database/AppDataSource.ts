import { DataSource } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import Beer from '../model/Beer';
import Brewery from '../model/Brewery';

dotenv.config();

const { DATABASE_URL: databaseURL } = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseURL as string,
  synchronize: true,
  logging: false,
  entities: [Beer, Brewery],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
