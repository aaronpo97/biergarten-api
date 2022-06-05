import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Brewery from './Brewery';
import User from './User';

@Entity()
export default class BreweryImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  path!: string;

  @JoinColumn()
  @ManyToOne(() => Brewery, (brewery) => brewery.images)
  breweryPost!: Brewery;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.breweryImages)
  postedBy!: User;
}
