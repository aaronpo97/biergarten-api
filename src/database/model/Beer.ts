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
import Brewery from './Brewery';
import Comment from './Comment';
import Profile from './Profile';
import User from './User';

@Entity()
export default class Beer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  type!: string;

  @Column('float')
  abv!: number;

  @Column('float')
  ibu!: number;

  @JoinColumn()
  @ManyToOne(() => Brewery, (brewery) => brewery.beers, { onDelete: 'CASCADE' })
  brewery!: Brewery;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.beerPosts)
  postedBy!: User;

  @JoinColumn()
  @ManyToMany(() => Profile, (profile) => profile.likes)
  likedBy!: Array<Profile>;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Array<Comment>;
}
