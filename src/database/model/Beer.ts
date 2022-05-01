import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Brewery from './Brewery';
import Comment from './Comment';
import User from './User';

@Entity()
export default class Beer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('float')
  abv!: number;

  @Column('float')
  ibu!: number;

  @JoinColumn()
  @ManyToOne(() => Brewery, (brewery) => brewery.beers, { onDelete: 'CASCADE' })
  brewery!: Brewery;

  @ManyToOne(() => User, (user) => user.beerPosts)
  postedBy!: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Array<Comment>;
}
