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
export default class BeerComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  commentBody!: string;

  @Column()
  rating!: 1 | 2 | 3 | 4 | 5;

  @Column()
  postedDate!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  editedDate!: Date;

  @ManyToOne(() => BeerPost, (beer) => beer.comments)
  @JoinColumn()
  beerPost!: BeerPost;

  @ManyToOne(() => User, (user) => user.beerComments)
  @JoinColumn()
  postedBy!: User;
}
