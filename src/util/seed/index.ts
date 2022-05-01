import { getConnection } from 'typeorm';
import AppDataSource from '../../database/AppDataSource';
import Beer from '../../database/model/Beer';

const seed = async (): Promise<void> => {
  await Beer.delete({});
};

seed();
