import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Brewery from './Brewery';
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
  editedDate!: Date;

  @ManyToOne(() => Brewery, (brewery) => brewery.reviews)
  @JoinColumn()
  breweryPost!: Brewery

  @ManyToOne(() => User, (user) => user.breweryReviews)
  @JoinColumn()
  postedBy!: User;
}
