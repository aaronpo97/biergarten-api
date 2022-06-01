import { DataSource } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import Beer from './model/Beer';
import Brewery from './model/Brewery';
import User from './model/User';

import Profile from './model/Profile';
import BeerComment from './model/BeerComment';
import BeerImage from './model/BeerImage';
import BreweryImage from './model/BreweryImage';
import BreweryReview from './model/BreweryReview';

dotenv.config();
const { LOCAL_DB_CONNECTION_STRING, CLOUD_DB_CONNECTION_STRING, NODE_ENV } = process.env;

const inProductionMode = NODE_ENV === 'production';

if (!(CLOUD_DB_CONNECTION_STRING && LOCAL_DB_CONNECTION_STRING)) {
  throw new Error(
    'Your database credentials were not provided in the environment variables.',
  );
}

const entities = [Beer, Brewery, User, Profile, BeerComment, BeerImage, BreweryImage, BreweryReview];

const LocalAppDataSource = new DataSource({
  type: 'postgres',
  entities,
  url: LOCAL_DB_CONNECTION_STRING,
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});

const CloudAppDataSource = new DataSource({
  type: 'cockroachdb',
  entities,
  url: CLOUD_DB_CONNECTION_STRING,
  synchronize: false,
  logging: true,
  migrations: [],
  subscribers: [],
  ssl: true,
});

const AppDataSource = inProductionMode ? CloudAppDataSource : LocalAppDataSource;

export default AppDataSource;
