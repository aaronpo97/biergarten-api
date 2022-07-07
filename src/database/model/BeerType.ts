import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import BeerPost from './BeerPost';

import User from './User';

@Entity()
export default class BeerType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.beerPosts)
  postedBy!: User;

  @JoinColumn()
  @OneToMany(() => BeerPost, (beerPost) => beerPost.type)
  beerPosts!: BeerPost[];

  @Column()
  createdAt!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  modifiedAt!: Date | null;
}
