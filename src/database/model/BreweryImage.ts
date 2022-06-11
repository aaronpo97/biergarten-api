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

  @Column()
  filename!: string;

  @JoinColumn()
  @ManyToOne(() => BreweryPost, (brewery) => brewery.images)
  breweryPost!: BreweryPost;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.breweryImages)
  author!: User;

  @Column()
  caption!: string;
}
