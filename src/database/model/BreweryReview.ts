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
export default class BreweryReview extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  reviewBody!: string;

  @Column()
  rating!: 1 | 2 | 3 | 4 | 5;

  @Column()
  createdAt!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  modifiedAt!: Date | null;

  @ManyToOne(() => BreweryPost, (brewery) => brewery.reviews)
  @JoinColumn()
  breweryPost!: BreweryPost;

  @ManyToOne(() => User, (user) => user.breweryReviews)
  @JoinColumn()
  postedBy!: User;
}
