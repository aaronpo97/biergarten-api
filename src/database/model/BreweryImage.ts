import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BreweryPost from './BreweryPost';
import User from './User';

@Entity()
export default class BreweryImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  path!: string;

  @JoinColumn()
  @ManyToOne(() => BreweryPost, (brewery) => brewery.images)
  breweryPost!: BreweryPost;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.breweryImages)
  postedBy!: User;
}
