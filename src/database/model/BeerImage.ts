import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BeerPost from './BeerPost';
import User from './User';

@Entity()
export default class BeerImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  path!: string;

  @JoinColumn()
  @ManyToOne(() => BeerPost, (beer) => beer.images)
  beerPost!: BeerPost;

  @Column()
  filename!: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.beerImages)
  author!: User;

  @Column()
  caption!: string;
}
