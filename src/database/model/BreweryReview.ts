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
  rating!: number;

  @Column()
  postedDate!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  editedDate!: Date | null;

  @ManyToOne(() => BreweryPost, (brewery) => brewery.reviews)
  @JoinColumn()
  breweryPost!: BreweryPost;

  @ManyToOne(() => User, (user) => user.breweryReviews)
  @JoinColumn()
  postedBy!: User;
}
