import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import Brewery from './Brewery';
import Comment from './Comment';
import User from './User';

@Entity()
export default class Beer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  abv!: number;

  @Column()
  ibu!: number;

  @ManyToOne(() => Brewery, (brewery) => brewery.beers)
  brewery!: Brewery;

  @ManyToOne(() => User, (user) => user.beerPosts)
  postedBy!: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Array<Comment>;
}
