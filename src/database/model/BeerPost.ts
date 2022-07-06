import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import BeerComment from './BeerComment';
import BeerImage from './BeerImage';
import BeerType from './BeerType';
import BreweryPost from './BreweryPost';

import Profile from './Profile';
import User from './User';

@Entity()
export default class BeerPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @JoinColumn()
  @ManyToOne(() => BeerType, (beerType) => beerType.beerPosts, { onDelete: 'CASCADE' })
  type!: BeerType;

  @Column('float')
  abv!: number;

  @Column('float')
  ibu!: number;

  @JoinColumn()
  @ManyToOne(() => BreweryPost, (brewery) => brewery.beers, { onDelete: 'CASCADE' })
  brewery!: BreweryPost;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.beerPosts)
  postedBy!: User;

  @JoinColumn()
  @ManyToMany(() => Profile, (profile) => profile.likes)
  likedBy!: Array<Profile>;

  @JoinColumn()
  @OneToMany(() => BeerComment, (beerComment) => beerComment.beerPost)
  comments!: Array<BeerComment>;

  @JoinColumn()
  @OneToMany(() => BeerImage, (beerImage) => beerImage.beerPost)
  images!: Array<BeerImage>;

  @Column()
  createdAt!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  modifiedAt!: Date | null;
}
